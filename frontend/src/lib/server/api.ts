import type { UserSession } from "$lib/types/auth";
import type { UserProfile, UpdateProfileRequest } from "$lib/types/profile";
import type { IProject, IProjectBacklink } from "$lib/types/project";

export const SESSION_COOKIE_NAME = "werk_session";

export function getBackendUrl(): string {
	return process.env.BACKEND_URL || "http://localhost:3001";
}

export function getSessionCookieOptions() {
	return {
		path: "/",
		httpOnly: true,
		sameSite: "lax" as const,
		secure: process.env.NODE_ENV === "production",
		maxAge: 30 * 24 * 60 * 60 // 30 days
	};
}

export async function validateSessionToken(
	fetchFn: typeof fetch,
	token: string
): Promise<UserSession | null> {
	if (!token) return null;

	const backendUrl = getBackendUrl();
	try {
		const res = await fetchFn(`${backendUrl}/api/auth/me`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!res.ok) {
			return null;
		}

		const data = (await res.json()) as { user: UserSession };
		return data.user;
	} catch {
		return null;
	}
}

export async function revokeSessionToken(fetchFn: typeof fetch, token: string): Promise<void> {
	if (!token) return;

	const backendUrl = getBackendUrl();
	try {
		await fetchFn(`${backendUrl}/api/auth/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ token })
		});
	} catch {
		// Ignore network failure on logout
	}
}

export async function getUserProfile(
	fetchFn: typeof fetch,
	username: string,
	sessionToken?: string
): Promise<{ user: UserProfile; projects: IProjectBacklink[] } | null> {
	if (!username) return null;

	const backendUrl = getBackendUrl();
	const headers: Record<string, string> = {};
	if (sessionToken) {
		headers.Authorization = `Bearer ${sessionToken}`;
	}

	try {
		const res = await fetchFn(`${backendUrl}/api/users/${encodeURIComponent(username)}`, {
			headers
		});

		if (!res.ok) {
			return null;
		}

		const data = (await res.json()) as { user: UserProfile; projects?: IProjectBacklink[] };
		return {
			user: data.user,
			projects: data.projects || []
		};
	} catch {
		return null;
	}
}

export async function getProjects(
	fetchFn: typeof fetch,
	sessionToken?: string,
	query?: { status?: string; tag?: string; search?: string }
): Promise<{
	projects: IProject[];
	pagination: { total: number; page: number; limit: number; pages: number };
}> {
	const backendUrl = getBackendUrl();
	const headers: Record<string, string> = {};
	if (sessionToken) {
		headers.Authorization = `Bearer ${sessionToken}`;
	}

	const params = new URLSearchParams();
	if (query?.status) params.set("status", query.status);
	if (query?.tag) params.set("tag", query.tag);
	if (query?.search) params.set("search", query.search);

	try {
		const res = await fetchFn(`${backendUrl}/api/projects?${params.toString()}`, { headers });
		if (!res.ok) return { projects: [], pagination: { total: 0, page: 1, limit: 20, pages: 0 } };
		return await res.json();
	} catch {
		return { projects: [], pagination: { total: 0, page: 1, limit: 20, pages: 0 } };
	}
}

export async function getProjectById(
	fetchFn: typeof fetch,
	id: string,
	sessionToken?: string
): Promise<IProject | null> {
	if (!id) return null;
	const backendUrl = getBackendUrl();
	const headers: Record<string, string> = {};
	if (sessionToken) {
		headers.Authorization = `Bearer ${sessionToken}`;
	}

	try {
		const res = await fetchFn(`${backendUrl}/api/projects/${encodeURIComponent(id)}`, {
			headers
		});
		if (!res.ok) return null;
		const data = (await res.json()) as { project: IProject };
		return data.project;
	} catch {
		return null;
	}
}

export async function createProject(
	fetchFn: typeof fetch,
	sessionToken: string,
	projectData: { title: string; description?: string; tags?: string[]; isPublic?: boolean }
): Promise<{ success: boolean; project?: IProject; error?: string }> {
	const backendUrl = getBackendUrl();
	try {
		const res = await fetchFn(`${backendUrl}/api/projects`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionToken}`
			},
			body: JSON.stringify(projectData)
		});

		if (!res.ok) {
			const errData = await res.json().catch(() => ({}));
			return { success: false, error: errData.message || "CREATE_FAILED" };
		}

		const data = await res.json();
		return { success: true, project: data.project };
	} catch (err) {
		return { success: false, error: err instanceof Error ? err.message : "Server error" };
	}
}

export async function updateUserProfile(
	fetchFn: typeof fetch,
	sessionToken: string,
	profileData: UpdateProfileRequest
): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
	if (!sessionToken) {
		return { success: false, error: "UNAUTHORIZED" };
	}

	const backendUrl = getBackendUrl();
	try {
		const res = await fetchFn(`${backendUrl}/api/users/me`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionToken}`
			},
			body: JSON.stringify(profileData)
		});

		if (!res.ok) {
			const errorData = (await res.json().catch(() => ({}))) as {
				error?: string;
				message?: string;
			};
			return {
				success: false,
				error: errorData.error || "UPDATE_FAILED"
			};
		}

		const data = (await res.json()) as { user: UserProfile };
		return { success: true, user: data.user };
	} catch (err) {
		const message = err instanceof Error ? err.message : "Server unreachable";
		return { success: false, error: message };
	}
}
