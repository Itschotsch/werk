import type { UserSession } from '$lib/types/auth';

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
