import type { FastifyPluginAsync } from "fastify";
import { User, type IUserLocation } from "../models/User.js";
import { Project } from "../models/Project.js";
import { validateSession } from "../services/auth.service.js";

interface UpdateProfileBody {
	displayName?: string;
	biography?: string;
	locations?: IUserLocation[];
	roles?: string[];
	website?: string;
	avatarUrl?: string;
}

function sanitizeWebsiteUrl(urlStr: string): string {
	const trimmed = urlStr.trim();
	if (!trimmed) return "";
	if (!/^https?:\/\//i.test(trimmed)) {
		return `https://${trimmed}`;
	}
	return trimmed;
}

export const userRoutes: FastifyPluginAsync = async (app) => {
	// GET /api/users/:username or GET /api/users/profile/:username
	const getUserHandler = async (usernameParam: string, authHeader?: string) => {
		const cleanParam = usernameParam.trim().toLowerCase();

		const queryConditions: Record<string, unknown>[] = [
			{ username: cleanParam },
			{ email: cleanParam }
		];

		const user = await User.findOne({ $or: queryConditions });
		if (!user) {
			return {
				status: 404,
				payload: { error: "USER_NOT_FOUND", message: "User profile not found" }
			};
		}

		// Ensure user has valid non-null non-empty username, email, and displayName
		let needsSave = false;
		if (!user.email || user.email.trim() === "") {
			user.email = `user_${user._id.toString()}@werk.local`;
			needsSave = true;
		}
		if (!user.username || user.username.trim() === "") {
			const emailPrefix = user.email ? user.email.split("@")[0] : undefined;
			const candidate = (emailPrefix || `user_${user._id.toString().slice(-6)}`)
				.toLowerCase()
				.replace(/[^a-z0-9_-]/g, "_");
			user.username = candidate || `user_${user._id.toString().slice(-6)}`;
			needsSave = true;
		}
		if (!user.displayName || user.displayName.trim() === "") {
			user.displayName = user.username;
			needsSave = true;
		}
		if (needsSave) {
			await user.save();
		}

		let isOwner = false;
		if (authHeader?.startsWith("Bearer ")) {
			const token = authHeader.substring(7).trim();
			const sessionResult = await validateSession(token);
			if (sessionResult && sessionResult.user._id.toString() === user._id.toString()) {
				isOwner = true;
			}
		}

		// Fetch project backlinks for this user (confirmed or pending)
		const projects = await Project.find({
			isPublic: true,
			$or: [
				{ leaders: user._id },
				{
					"participants.user": user._id,
					"participants.status": { $in: ["confirmed", "pending"] }
				}
			]
		}).sort({ updatedAt: -1 });

		const formattedProjects = projects.map((p) => {
			const isLeader = p.leaders.some((l) => l.toString() === user._id.toString());
			const participant = p.participants.find(
				(part) => part.user && part.user.toString() === user._id.toString()
			);

			return {
				id: p._id.toString(),
				title: p.title,
				role: participant?.role || (isLeader ? "Project Leader" : "Contributor"),
				status: participant ? participant.status : "confirmed",
				contributionNote: participant?.contributionNote || "",
				latestStatus: p.statusHistory[0] || null,
				updatedAt: p.updatedAt.toISOString()
			};
		});

		return {
			status: 200,
			payload: {
				user: {
					id: user._id.toString(),
					username: user.username,
					displayName: user.displayName,
					biography: user.biography || "",
					locations: user.locations || [],
					roles: user.roles || [],
					website: user.website || "",
					avatarUrl: user.avatarUrl || "",
					createdAt: user.createdAt.toISOString(),
					isOwner
				},
				projects: formattedProjects
			}
		};
	};

	app.get<{ Params: { username: string } }>("/:username", async (request, reply) => {
		const { username } = request.params;
		const result = await getUserHandler(username, request.headers.authorization);
		return reply.status(result.status).send(result.payload);
	});

	// PATCH /api/users/me - Update currently signed-in user's profile
	app.patch<{ Body: UpdateProfileBody }>("/me", async (request, reply) => {
		const authHeader = request.headers.authorization;
		if (!authHeader?.startsWith("Bearer ")) {
			return reply.status(401).send({
				error: "UNAUTHORIZED",
				message: "Authorization header with Bearer token is required"
			});
		}

		const token = authHeader.substring(7).trim();
		const sessionResult = await validateSession(token);
		if (!sessionResult) {
			return reply.status(401).send({
				error: "UNAUTHORIZED",
				message: "Invalid or expired session"
			});
		}

		const currentUserId = sessionResult.user._id;
		const { displayName, biography, locations, roles, website, avatarUrl } = request.body || {};

		const updateFields: Record<string, unknown> = {};

		if (displayName !== undefined) {
			const cleanDisplayName = displayName.trim();
			if (!cleanDisplayName || cleanDisplayName.length > 50) {
				return reply.status(400).send({
					error: "INVALID_DISPLAY_NAME",
					message: "Display name is required (1-50 characters)"
				});
			}
			updateFields.displayName = cleanDisplayName;
		}

		if (biography !== undefined) {
			const cleanBio = biography.trim();
			if (cleanBio.length > 5000) {
				return reply.status(400).send({
					error: "INVALID_BIOGRAPHY",
					message: "Biography must be at most 5000 characters"
				});
			}
			updateFields.biography = cleanBio;
		}

		if (locations !== undefined) {
			if (!Array.isArray(locations)) {
				return reply.status(400).send({
					error: "INVALID_LOCATIONS",
					message: "Locations must be an array of location objects"
				});
			}

			const cleanLocations: IUserLocation[] = locations
				.filter((loc) => loc && typeof loc.name === "string" && loc.name.trim().length > 0)
				.map((loc) => ({
					name: loc.name.trim().slice(0, 200),
					...(typeof loc.lat === "number" && !isNaN(loc.lat) ? { lat: loc.lat } : {}),
					...(typeof loc.lon === "number" && !isNaN(loc.lon) ? { lon: loc.lon } : {}),
					...(typeof loc.placeId === "string" && loc.placeId.trim()
						? { placeId: loc.placeId.trim() }
						: {})
				}))
				.slice(0, 20);

			updateFields.locations = cleanLocations;
		}

		if (roles !== undefined) {
			if (!Array.isArray(roles)) {
				return reply.status(400).send({
					error: "INVALID_ROLES",
					message: "Roles must be an array of strings"
				});
			}
			const cleanRoles = roles
				.map((r) => (typeof r === "string" ? r.trim() : ""))
				.filter((r) => r.length > 0 && r.length <= 30)
				.slice(0, 10);
			updateFields.roles = cleanRoles;
		}

		if (website !== undefined) {
			const cleanWebsite = website.trim();
			if (cleanWebsite.length > 200) {
				return reply.status(400).send({
					error: "INVALID_WEBSITE",
					message: "Website URL must be at most 200 characters"
				});
			}
			updateFields.website = cleanWebsite ? sanitizeWebsiteUrl(cleanWebsite) : "";
		}

		if (avatarUrl !== undefined) {
			const cleanAvatarUrl = avatarUrl.trim();
			if (cleanAvatarUrl.length > 500) {
				return reply.status(400).send({
					error: "INVALID_AVATAR_URL",
					message: "Avatar URL must be at most 500 characters"
				});
			}
			updateFields.avatarUrl = cleanAvatarUrl;
		}

		const updatedUser = await User.findByIdAndUpdate(
			currentUserId,
			{ $set: updateFields },
			{ new: true }
		);

		if (!updatedUser) {
			return reply.status(404).send({
				error: "USER_NOT_FOUND",
				message: "User account not found"
			});
		}

		return reply.status(200).send({
			user: {
				id: updatedUser._id.toString(),
				username: updatedUser.username,
				displayName: updatedUser.displayName,
				biography: updatedUser.biography || "",
				locations: updatedUser.locations || [],
				roles: updatedUser.roles || [],
				website: updatedUser.website || "",
				avatarUrl: updatedUser.avatarUrl || "",
				createdAt: updatedUser.createdAt.toISOString(),
				isOwner: true
			}
		});
	});
};
