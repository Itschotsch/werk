import type { Handle } from '@sveltejs/kit';
import { resolveLocale } from '$lib/i18n';
import { SESSION_COOKIE_NAME, validateSessionToken } from '$lib/server/api';

export const handle: Handle = async ({ event, resolve }) => {
	const acceptLanguage = event.request.headers.get('accept-language');
	const cookieLocale = event.cookies.get('locale');
	const locale = resolveLocale(acceptLanguage, cookieLocale);

	event.locals.locale = locale;

	// Check authentication session
	const sessionToken = event.cookies.get(SESSION_COOKIE_NAME);
	if (sessionToken) {
		const user = await validateSessionToken(event.fetch, sessionToken);
		if (user) {
			event.locals.user = user;
		} else {
			// Session invalid or expired: clear stale cookie
			event.cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};
