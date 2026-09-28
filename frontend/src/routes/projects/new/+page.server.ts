import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { createProject, SESSION_COOKIE_NAME } from "$lib/server/api";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, "/login");
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		const sessionToken = cookies.get(SESSION_COOKIE_NAME);
		if (!sessionToken) {
			return fail(401, { error: "UNAUTHORIZED" });
		}

		const formData = await request.formData();
		const title = formData.get("title")?.toString() ?? "";
		const description = formData.get("description")?.toString() ?? "";
		const tagsStr = formData.get("tags")?.toString() ?? "";
		const isPublic = formData.get("isPublic") === "on";

		const tags = tagsStr
			.split(",")
			.map((t) => t.trim())
			.filter(Boolean);

		const result = await createProject(fetch, sessionToken, {
			title,
			description,
			tags,
			isPublic
		});

		if (!result.success || !result.project) {
			return fail(400, {
				error: result.error || "CREATE_FAILED",
				fields: { title, description, tagsStr }
			});
		}

		throw redirect(303, `/projects/${result.project.id}`);
	}
};
