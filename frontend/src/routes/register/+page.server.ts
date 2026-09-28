import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { getBackendUrl, SESSION_COOKIE_NAME, getSessionCookieOptions } from "$lib/server/api";
import type { AuthSuccessResponse, AuthErrorResponse } from "$lib/types/auth";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, "/");
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		const formData = await request.formData();
		const email = formData.get("email")?.toString() ?? "";
		const username = formData.get("username")?.toString() ?? "";
		const displayName = formData.get("displayName")?.toString() ?? "";
		const password = formData.get("password")?.toString() ?? "";

		if (!email || !email.includes("@")) {
			return fail(400, {
				email,
				username,
				displayName,
				error: "INVALID_EMAIL"
			});
		}

		const cleanUsername = username.trim().toLowerCase();
		if (
			!cleanUsername ||
			cleanUsername.length < 3 ||
			cleanUsername.length > 30 ||
			!/^[a-z0-9_-]+$/.test(cleanUsername)
		) {
			return fail(400, {
				email,
				username,
				displayName,
				error: "INVALID_USERNAME"
			});
		}

		if (!displayName.trim()) {
			return fail(400, {
				email,
				username,
				displayName,
				error: "INVALID_DISPLAY_NAME"
			});
		}

		if (!password || password.length < 8) {
			return fail(400, {
				email,
				username,
				displayName,
				error: "INVALID_PASSWORD"
			});
		}

		const backendUrl = getBackendUrl();
		try {
			const res = await fetch(`${backendUrl}/api/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email.trim().toLowerCase(),
					username: cleanUsername,
					displayName: displayName.trim(),
					password
				})
			});

			if (!res.ok) {
				const errorData = (await res.json().catch(() => ({}))) as AuthErrorResponse;
				return fail(res.status, {
					email,
					username,
					displayName,
					error: errorData.error || "REGISTRATION_FAILED"
				});
			}

			const data = (await res.json()) as AuthSuccessResponse;
			cookies.set(SESSION_COOKIE_NAME, data.token, getSessionCookieOptions());
		} catch (err) {
			const message = err instanceof Error ? err.message : "Server unreachable";
			return fail(500, {
				email,
				username,
				displayName,
				error: "NETWORK_ERROR",
				errorMessage: message
			});
		}

		throw redirect(303, "/");
	}
};
