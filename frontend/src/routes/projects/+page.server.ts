import type { PageServerLoad } from "./$types";
import { getProjects, SESSION_COOKIE_NAME } from "$lib/server/api";

export const load: PageServerLoad = async ({ fetch, url, cookies }) => {
	const sessionToken = cookies.get(SESSION_COOKIE_NAME);
	const status = url.searchParams.get("status") || undefined;
	const tag = url.searchParams.get("tag") || undefined;
	const search = url.searchParams.get("search") || undefined;

	const { projects, pagination } = await getProjects(fetch, sessionToken, { status, tag, search });

	return {
		projects,
		pagination,
		filters: { status, tag, search }
	};
};
