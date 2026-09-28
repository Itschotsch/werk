import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getUserProfile, updateUserProfile, SESSION_COOKIE_NAME } from "$lib/server/api";
import type { UserLocation } from "$lib/types/profile";

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const sessionToken = cookies.get(SESSION_COOKIE_NAME);
	const data = await getUserProfile(fetch, params.username, sessionToken);

	if (!data) {
		throw error(404, {
			message: "USER_NOT_FOUND"
		});
	}

	return {
		profile: data.user,
		projects: data.projects
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, fetch, cookies, locals }) => {
		const sessionToken = cookies.get(SESSION_COOKIE_NAME);
		if (!locals.user || !sessionToken) {
			return fail(401, {
				error: "UNAUTHORIZED"
			});
		}

		const formData = await request.formData();
		const displayName = formData.get("displayName")?.toString() ?? "";
		const biography = formData.get("biography")?.toString() ?? "";
		const locationsStr = formData.get("locations")?.toString() ?? "";
		const rolesStr = formData.get("roles")?.toString() ?? "";
		const website = formData.get("website")?.toString() ?? "";

		// Parse locations string (split by newlines or commas) into UserLocation objects
		const existingLocationsMap = new Map<string, UserLocation>();
		// Get existing profile to preserve lat/lon/placeId for unchanged location names
		const currentProfile = await getUserProfile(fetch, locals.user.username, sessionToken);
		if (currentProfile?.user?.locations) {
			for (const loc of currentProfile.user.locations) {
				existingLocationsMap.set(loc.name.toLowerCase().trim(), loc);
			}
		}

		const rawLocationNames = locationsStr
			.split(/[\n,]/)
			.map((l) => l.trim())
			.filter((l) => l.length > 0);

		// Deduplicate location names while preserving order
		const uniqueLocationNames = Array.from(new Set(rawLocationNames));

		const locations: UserLocation[] = uniqueLocationNames.map((name) => {
			const existing = existingLocationsMap.get(name.toLowerCase());
			if (existing) {
				return { ...existing, name };
			}
			return { name };
		});

		const roles = rolesStr
			.split(",")
			.map((r) => r.trim())
			.filter((r) => r.length > 0);

		const result = await updateUserProfile(fetch, sessionToken, {
			displayName,
			biography,
			locations,
			roles,
			website
		});

		if (!result.success || !result.user) {
			return fail(400, {
				error: result.error || "UPDATE_FAILED",
				fields: { displayName, biography, locationsStr, rolesStr, website }
			});
		}

		return {
			success: true,
			user: result.user
		};
	}
};
