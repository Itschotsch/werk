import type { FastifyPluginAsync } from "fastify";
import { Types } from "mongoose";
import {
	Project,
	type IProjectParticipant,
	type ProjectStatus,
	type IProjectLogEntry
} from "../models/Project.js";
import { User } from "../models/User.js";
import { validateSession } from "../services/auth.service.js";
import { buildPartialDate } from "../utils/date.js";

function getIdString(item: unknown): string {
	if (!item) return "";
	if (typeof item === "object" && "_id" in item && item._id) {
		return String(item._id);
	}
	return String(item);
}

export const projectRoutes: FastifyPluginAsync = async (app) => {
	// Helper to extract session from Bearer token
	const getAuthUser = async (authHeader?: string) => {
		if (!authHeader?.startsWith("Bearer ")) return null;
		const token = authHeader.substring(7).trim();
		const sessionResult = await validateSession(token);
		return sessionResult ? sessionResult.user : null;
	};

	// GET /api/projects - List public projects
	app.get<{
		Querystring: {
			status?: string;
			tag?: string;
			search?: string;
			page?: string;
			limit?: string;
		};
	}>("/", async (request, reply) => {
		const authUser = await getAuthUser(request.headers.authorization);
		const { status, tag, search, page = "1", limit = "20" } = request.query;

		const pageNum = Math.max(1, parseInt(page, 10) || 1);
		const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));

		const filter: Record<string, unknown> = {};

		// Non-authenticated or regular users see only public projects
		if (!authUser) {
			filter.isPublic = true;
		} else {
			filter.$or = [
				{ isPublic: true },
				{ leaders: authUser._id },
				{ "participants.user": authUser._id },
				{ viewers: authUser._id }
			];
		}

		if (status) {
			filter["statusHistory.0.status"] = status;
		}

		if (tag) {
			filter.tags = tag.toLowerCase().trim();
		}

		if (search) {
			const searchRegex = new RegExp(search.trim(), "i");
			filter.$or = filter.$or
				? (filter.$or as Record<string, unknown>[]).map((cond) => ({
						...cond,
						title: searchRegex
					}))
				: [{ title: searchRegex }, { description: searchRegex }];
		}

		const total = await Project.countDocuments(filter);
		const projects = await Project.find(filter)
			.populate("leaders", "username displayName avatarUrl")
			.populate("participants.user", "username displayName avatarUrl")
			.sort({ updatedAt: -1 })
			.skip((pageNum - 1) * limitNum)
			.limit(limitNum);

		return reply.status(200).send({
			projects: projects.map((p) => ({
				id: p._id.toString(),
				title: p.title,
				description: p.description,
				statusHistory: p.statusHistory,
				locations: p.locations,
				leaders: p.leaders,
				participants: p.participants,
				tags: p.tags,
				coverUrl: p.coverUrl || "",
				isPublic: p.isPublic,
				createdAt: p.createdAt.toISOString(),
				updatedAt: p.updatedAt.toISOString()
			})),
			pagination: {
				page: pageNum,
				limit: limitNum,
				total,
				pages: Math.ceil(total / limitNum)
			}
		});
	});

	// POST /api/projects - Create a project
	app.post<{
		Body: {
			title: string;
			description?: string;
			tags?: string[];
			isPublic?: boolean;
			status?: string;
		};
	}>("/", async (request, reply) => {
		const authUser = await getAuthUser(request.headers.authorization);
		if (!authUser) {
			return reply.status(401).send({ error: "UNAUTHORIZED", message: "Authentication required" });
		}

		const {
			title,
			description = "",
			tags = [],
			isPublic = true,
			status = "planning"
		} = request.body || {};

		const cleanTitle = (title || "").trim();
		if (!cleanTitle || cleanTitle.length > 300) {
			return reply.status(400).send({
				error: "INVALID_TITLE",
				message: "Project title is required (1-300 characters)"
			});
		}

		const initialStatus = buildPartialDate();
		const newProject = new Project({
			title: cleanTitle,
			description: (description || "").trim().slice(0, 20000),
			statusHistory: [
				{
					status: ["draft", "planning", "in_production", "completed", "archived"].includes(status)
						? status
						: "planning",
					date: initialStatus,
					note: "Project created"
				}
			],
			locations: [],
			leaders: [authUser._id],
			participants: [
				{
					user: authUser._id,
					role: "Project Leader",
					status: "confirmed",
					addedAt: new Date()
				}
			],
			viewers: [],
			logEntries: [],
			tags: Array.isArray(tags)
				? tags.map((t) => (typeof t === "string" ? t.trim().toLowerCase() : "")).filter(Boolean)
				: [],
			coverUrl: "",
			isPublic: Boolean(isPublic)
		});

		await newProject.save();

		return reply.status(201).send({
			project: {
				id: newProject._id.toString(),
				title: newProject.title,
				description: newProject.description,
				statusHistory: newProject.statusHistory,
				leaders: [
					{
						id: authUser._id.toString(),
						username: authUser.username,
						displayName: authUser.displayName
					}
				],
				participants: newProject.participants,
				tags: newProject.tags,
				isPublic: newProject.isPublic,
				createdAt: newProject.createdAt.toISOString()
			}
		});
	});

	// GET /api/projects/:id - Get project details
	app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
		const authUser = await getAuthUser(request.headers.authorization);
		const { id } = request.params;

		if (!Types.ObjectId.isValid(id)) {
			return reply.status(404).send({ error: "PROJECT_NOT_FOUND", message: "Project not found" });
		}

		const project = await Project.findById(id)
			.populate("leaders", "username displayName avatarUrl")
			.populate("participants.user", "username displayName avatarUrl")
			.populate("logEntries.author", "username displayName avatarUrl");

		if (!project) {
			return reply.status(404).send({ error: "PROJECT_NOT_FOUND", message: "Project not found" });
		}

		// Authorization check for private projects
		if (!project.isPublic) {
			const userIdStr = authUser ? authUser._id.toString() : "";
			const isLeader = project.leaders.some((l) => getIdString(l) === userIdStr);
			const isParticipant = project.participants.some(
				(p) => getIdString(p.user) === userIdStr && p.status === "confirmed"
			);
			const isViewer = project.viewers.some((v) => getIdString(v) === userIdStr);

			if (!isLeader && !isParticipant && !isViewer) {
				return reply
					.status(403)
					.send({ error: "FORBIDDEN", message: "Access denied to this project" });
			}
		}

		const isLeader = authUser
			? project.leaders.some(
					(l) => (l._id ? l._id.toString() : l.toString()) === authUser._id.toString()
				)
			: false;

		return reply.status(200).send({
			project: {
				id: project._id.toString(),
				title: project.title,
				description: project.description,
				statusHistory: project.statusHistory,
				locations: project.locations,
				leaders: project.leaders,
				participants: project.participants,
				logEntries: project.logEntries,
				tags: project.tags,
				coverUrl: project.coverUrl || "",
				isPublic: project.isPublic,
				createdAt: project.createdAt.toISOString(),
				updatedAt: project.updatedAt.toISOString(),
				isLeader
			}
		});
	});

	// PATCH /api/projects/:id - Update project details or status
	app.patch<{
		Params: { id: string };
		Body: {
			title?: string;
			description?: string;
			status?: string;
			statusNote?: string;
			tags?: string[];
			isPublic?: boolean;
		};
	}>("/:id", async (request, reply) => {
		const authUser = await getAuthUser(request.headers.authorization);
		if (!authUser) {
			return reply.status(401).send({ error: "UNAUTHORIZED", message: "Authentication required" });
		}

		const { id } = request.params;
		if (!Types.ObjectId.isValid(id)) {
			return reply.status(404).send({ error: "PROJECT_NOT_FOUND", message: "Project not found" });
		}

		const project = await Project.findById(id);

		if (!project) {
			return reply.status(404).send({ error: "PROJECT_NOT_FOUND", message: "Project not found" });
		}

		// Ensure authUser is leader
		const isLeader = project.leaders.some((l) => l.toString() === authUser._id.toString());
		if (!isLeader) {
			return reply
				.status(403)
				.send({ error: "FORBIDDEN", message: "Only project leaders can update project details" });
		}

		const { title, description, status, statusNote, tags, isPublic } = request.body || {};

		if (title !== undefined) {
			const cleanTitle = title.trim();
			if (!cleanTitle || cleanTitle.length > 300) {
				return reply
					.status(400)
					.send({ error: "INVALID_TITLE", message: "Title must be 1-300 characters" });
			}
			project.title = cleanTitle;
		}

		if (description !== undefined) {
			project.description = description.trim().slice(0, 20000);
		}

		if (
			status &&
			["draft", "planning", "in_production", "completed", "archived"].includes(status)
		) {
			const latestStatus = project.statusHistory[0]?.status;
			if (latestStatus !== status) {
				project.statusHistory.unshift({
					status: status as ProjectStatus,
					date: buildPartialDate(),
					note: (statusNote || "").trim().slice(0, 1000)
				});
			}
		}

		if (Array.isArray(tags)) {
			project.tags = tags
				.map((t) => (typeof t === "string" ? t.trim().toLowerCase() : ""))
				.filter(Boolean);
		}

		if (isPublic !== undefined) {
			project.isPublic = Boolean(isPublic);
		}

		await project.save();

		return reply.status(200).send({
			message: "Project updated successfully",
			project: {
				id: project._id.toString(),
				title: project.title,
				description: project.description,
				statusHistory: project.statusHistory,
				isPublic: project.isPublic
			}
		});
	});

	// POST /api/projects/:id/participants - Add participant
	app.post<{
		Params: { id: string };
		Body: {
			usernameOrEmail?: string;
			name?: string;
			role: string;
		};
	}>("/:id/participants", async (request, reply) => {
		const authUser = await getAuthUser(request.headers.authorization);
		if (!authUser) {
			return reply.status(401).send({ error: "UNAUTHORIZED", message: "Authentication required" });
		}

		const { id } = request.params;
		if (!Types.ObjectId.isValid(id)) {
			return reply.status(404).send({ error: "PROJECT_NOT_FOUND", message: "Project not found" });
		}

		const project = await Project.findById(id);

		if (!project) {
			return reply.status(404).send({ error: "PROJECT_NOT_FOUND", message: "Project not found" });
		}

		const isLeader = project.leaders.some((l) => l.toString() === authUser._id.toString());
		if (!isLeader) {
			return reply
				.status(403)
				.send({ error: "FORBIDDEN", message: "Only project leaders can manage participants" });
		}

		const { usernameOrEmail, name, role } = request.body || {};
		const cleanRole = (role || "").trim();

		if (!cleanRole || cleanRole.length > 200) {
			return reply
				.status(400)
				.send({ error: "INVALID_ROLE", message: "Role is required (1-200 characters)" });
		}

		let linkedUser = null;
		if (usernameOrEmail && usernameOrEmail.trim()) {
			const cleanParam = usernameOrEmail.trim().toLowerCase();
			linkedUser = await User.findOne({
				$or: [{ username: cleanParam }, { email: cleanParam }]
			});
			if (!linkedUser) {
				return reply.status(404).send({
					error: "USER_NOT_FOUND",
					message: `No user found with username or email "${usernameOrEmail.trim()}"`
				});
			}
		} else if (!name || !name.trim()) {
			return reply.status(400).send({
				error: "INVALID_PARTICIPANT",
				message: "Either username/email or name is required"
			});
		}

		const newParticipant: IProjectParticipant = {
			user: linkedUser ? linkedUser._id : undefined,
			name: linkedUser ? linkedUser.displayName : (name || "").trim().slice(0, 200),
			role: cleanRole,
			status: linkedUser ? "pending" : "unlinked",
			addedAt: new Date()
		};

		project.participants.push(newParticipant);
		await project.save();

		return reply.status(201).send({
			message: "Participant added successfully",
			participants: project.participants
		});
	});

	// PATCH /api/users/me/project-credits/:projectId - Respond to credit invite
	app.patch<{
		Params: { projectId: string };
		Body: { action: "confirm" | "decline" };
	}>("/credits/:projectId", async (request, reply) => {
		const authUser = await getAuthUser(request.headers.authorization);
		if (!authUser) {
			return reply.status(401).send({ error: "UNAUTHORIZED", message: "Authentication required" });
		}

		const { projectId } = request.params;
		if (!Types.ObjectId.isValid(projectId)) {
			return reply.status(404).send({ error: "PROJECT_NOT_FOUND", message: "Project not found" });
		}

		const { action } = request.body || {};

		if (!["confirm", "decline"].includes(action)) {
			return reply
				.status(400)
				.send({ error: "INVALID_ACTION", message: "Action must be 'confirm' or 'decline'" });
		}

		const project = await Project.findById(projectId);
		if (!project) {
			return reply.status(404).send({ error: "PROJECT_NOT_FOUND", message: "Project not found" });
		}

		const participantEntry = project.participants.find(
			(p) => p.user && p.user.toString() === authUser._id.toString()
		);

		if (!participantEntry) {
			return reply
				.status(404)
				.send({ error: "CREDIT_NOT_FOUND", message: "No tagged credit found for user" });
		}

		participantEntry.status = action === "confirm" ? "confirmed" : "declined";
		await project.save();

		return reply.status(200).send({
			message: `Credit status updated to ${participantEntry.status}`,
			status: participantEntry.status
		});
	});

	// POST /api/projects/:id/logs - Add log entry
	app.post<{
		Params: { id: string };
		Body: {
			title: string;
			text: string;
			year?: number;
			month?: number;
			day?: number;
			hour?: number;
			minute?: number;
			locationName?: string;
		};
	}>("/:id/logs", async (request, reply) => {
		const authUser = await getAuthUser(request.headers.authorization);
		if (!authUser) {
			return reply.status(401).send({ error: "UNAUTHORIZED", message: "Authentication required" });
		}

		const { id } = request.params;
		if (!Types.ObjectId.isValid(id)) {
			return reply.status(404).send({ error: "PROJECT_NOT_FOUND", message: "Project not found" });
		}

		const project = await Project.findById(id);

		if (!project) {
			return reply.status(404).send({ error: "PROJECT_NOT_FOUND", message: "Project not found" });
		}

		const isLeader = project.leaders.some((l) => l.toString() === authUser._id.toString());
		const isConfirmedParticipant = project.participants.some(
			(p) => p.user && p.user.toString() === authUser._id.toString() && p.status === "confirmed"
		);

		if (!isLeader && !isConfirmedParticipant) {
			return reply.status(403).send({
				error: "FORBIDDEN",
				message: "Only leaders or confirmed participants can add log entries"
			});
		}

		const { title, text, year, month, day, hour, minute, locationName } = request.body || {};

		const cleanTitle = (title || "").trim();
		const cleanText = (text || "").trim();

		if (!cleanTitle || cleanTitle.length > 300) {
			return reply
				.status(400)
				.send({ error: "INVALID_TITLE", message: "Log title is required (1-300 characters)" });
		}

		if (!cleanText || cleanText.length > 20000) {
			return reply
				.status(400)
				.send({ error: "INVALID_TEXT", message: "Log text is required (1-20000 characters)" });
		}

		const logDate = buildPartialDate(
			year !== undefined ||
				month !== undefined ||
				day !== undefined ||
				hour !== undefined ||
				minute !== undefined
				? { year, month, day, hour, minute }
				: undefined
		);

		const newLogEntry = {
			datetime: logDate,
			title: cleanTitle,
			text: cleanText,
			author: authUser._id,
			location: locationName?.trim() ? { name: locationName.trim() } : undefined,
			attachments: []
		};

		project.logEntries.unshift(newLogEntry as unknown as IProjectLogEntry);
		await project.save();

		const populatedProject = await Project.findById(project._id).populate(
			"logEntries.author",
			"username displayName avatarUrl"
		);

		return reply.status(201).send({
			message: "Log entry created successfully",
			logEntries: populatedProject ? populatedProject.logEntries : project.logEntries
		});
	});
};
