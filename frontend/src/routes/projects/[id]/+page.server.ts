import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getProjectById, getBackendUrl, SESSION_COOKIE_NAME } from "$lib/server/api";

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	if (!params.id) {
		throw error(404, { message: "PROJECT_NOT_FOUND" });
	}

	const sessionToken = cookies.get(SESSION_COOKIE_NAME);
	const project = await getProjectById(fetch, params.id, sessionToken);

	if (!project) {
		throw error(404, { message: "PROJECT_NOT_FOUND" });
	}

	return {
		project
	};
};

export const actions: Actions = {
	addParticipant: async ({ request, params, fetch, cookies }) => {
		if (!params.id) return fail(400, { error: "INVALID_PROJECT_ID" });

		const sessionToken = cookies.get(SESSION_COOKIE_NAME);
		if (!sessionToken) return fail(401, { error: "UNAUTHORIZED" });

		const formData = await request.formData();
		const usernameOrEmail = formData.get("usernameOrEmail")?.toString() ?? "";
		const name = formData.get("name")?.toString() ?? "";
		const role = formData.get("role")?.toString() ?? "";

		const backendUrl = getBackendUrl();
		const res = await fetch(
			`${backendUrl}/api/projects/${encodeURIComponent(params.id)}/participants`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionToken}`
				},
				body: JSON.stringify({ usernameOrEmail, name, role })
			}
		);

		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			return fail(400, { error: data.message || "ADD_PARTICIPANT_FAILED" });
		}

		return { success: true };
	},

	addLogEntry: async ({ request, params, fetch, cookies }) => {
		if (!params.id) return fail(400, { error: "INVALID_PROJECT_ID" });

		const sessionToken = cookies.get(SESSION_COOKIE_NAME);
		if (!sessionToken) return fail(401, { error: "UNAUTHORIZED" });

		const formData = await request.formData();
		const title = formData.get("title")?.toString() ?? "";
		const text = formData.get("text")?.toString() ?? "";
		const locationName = formData.get("locationName")?.toString() ?? "";
		const datetimeStr = formData.get("datetime")?.toString() ?? "";

		let year: number | undefined;
		let month: number | undefined;
		let day: number | undefined;
		let hour: number | undefined;
		let minute: number | undefined;

		if (datetimeStr) {
			const parsed = new Date(datetimeStr);
			if (!isNaN(parsed.getTime())) {
				year = parsed.getFullYear();
				month = parsed.getMonth() + 1;
				day = parsed.getDate();
				hour = parsed.getHours();
				minute = parsed.getMinutes();
			}
		}

		const backendUrl = getBackendUrl();
		const res = await fetch(`${backendUrl}/api/projects/${encodeURIComponent(params.id)}/logs`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionToken}`
			},
			body: JSON.stringify({ title, text, locationName, year, month, day, hour, minute })
		});

		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			return fail(400, { error: data.message || "ADD_LOG_FAILED" });
		}

		return { success: true };
	}
};
