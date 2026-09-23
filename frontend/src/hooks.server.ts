import type { Handle } from '@sveltejs/kit';
import { resolveLocale } from '$lib/i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const acceptLanguage = event.request.headers.get('accept-language');
	const cookieLocale = event.cookies.get('locale');
	const locale = resolveLocale(acceptLanguage, cookieLocale);

	event.locals.locale = locale;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};
