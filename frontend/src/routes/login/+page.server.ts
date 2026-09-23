import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getBackendUrl, SESSION_COOKIE_NAME, getSessionCookieOptions } from '$lib/server/api';
import type { AuthSuccessResponse, AuthErrorResponse } from '$lib/types/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		const formData = await request.formData();
		const identifier = formData.get('identifier')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		if (!identifier.trim() || !password) {
			return fail(400, {
				identifier,
				error: 'MISSING_FIELDS'
			});
		}

		const backendUrl = getBackendUrl();
		try {
			const res = await fetch(`${backendUrl}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					identifier: identifier.trim(),
					password
				})
			});

			if (!res.ok) {
				const errorData = (await res.json().catch(() => ({}))) as AuthErrorResponse;
				return fail(res.status, {
					identifier,
					error: errorData.error || 'INVALID_CREDENTIALS'
				});
			}

			const data = (await res.json()) as AuthSuccessResponse;
			cookies.set(SESSION_COOKIE_NAME, data.token, getSessionCookieOptions());
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Server unreachable';
			return fail(500, {
				identifier,
				error: 'NETWORK_ERROR',
				errorMessage: message
			});
		}

		throw redirect(303, '/');
	}
};
