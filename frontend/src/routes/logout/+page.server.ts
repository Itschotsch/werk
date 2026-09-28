import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { SESSION_COOKIE_NAME, revokeSessionToken } from "$lib/server/api";

export const load: PageServerLoad = async () => {
	throw redirect(303, "/");
};

export const actions: Actions = {
	default: async ({ cookies, fetch }) => {
		const sessionToken = cookies.get(SESSION_COOKIE_NAME);
		if (sessionToken) {
			await revokeSessionToken(fetch, sessionToken);
			cookies.delete(SESSION_COOKIE_NAME, { path: "/" });
		}
		throw redirect(303, "/");
	}
};
