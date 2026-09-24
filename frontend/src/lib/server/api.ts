import type { UserSession } from '$lib/types/auth';
import type { UserProfile, UpdateProfileRequest } from '$lib/types/profile';

export const SESSION_COOKIE_NAME = 'werk_session';

export function getBackendUrl(): string {
	return process.env.BACKEND_URL || 'http://localhost:3001';
}

export function getSessionCookieOptions() {
	return {
		path: '/',
		httpOnly: true,
		sameSite: 'lax' as const,
		secure: process.env.NODE_ENV === 'production',
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
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
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
): Promise<UserProfile | null> {
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

		const data = (await res.json()) as { user: UserProfile };
		return data.user;
	} catch {
		return null;
	}
}

export async function updateUserProfile(
	fetchFn: typeof fetch,
	sessionToken: string,
	profileData: UpdateProfileRequest
): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
	if (!sessionToken) {
		return { success: false, error: 'UNAUTHORIZED' };
	}

	const backendUrl = getBackendUrl();
	try {
		const res = await fetchFn(`${backendUrl}/api/users/me`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
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
				error: errorData.error || 'UPDATE_FAILED'
			};
		}

		const data = (await res.json()) as { user: UserProfile };
		return { success: true, user: data.user };
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Server unreachable';
		return { success: false, error: message };
	}
}
