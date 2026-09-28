import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { DEFAULT_LOCALE, isSupportedLocale, SUPPORTED_LOCALES, type Locale } from "./types";

export function resolveLocale(
	acceptLanguageHeader?: string | null,
	cookieLocale?: string | null
): Locale {
	if (cookieLocale && isSupportedLocale(cookieLocale)) {
		return cookieLocale;
	}

	if (acceptLanguageHeader && acceptLanguageHeader.trim().length > 0) {
		try {
			const negotiator = new Negotiator({
				headers: { "accept-language": acceptLanguageHeader }
			});
			const requestedLanguages = negotiator.languages();
			if (requestedLanguages.length > 0) {
				const matched = match(requestedLanguages, SUPPORTED_LOCALES, DEFAULT_LOCALE);
				if (isSupportedLocale(matched)) {
					return matched;
				}
			}
		} catch {
			// Fall through to default on unexpected header format
		}
	}

	return DEFAULT_LOCALE;
}

export function detectBrowserLanguage(): Locale {
	if (typeof navigator === "undefined") {
		return DEFAULT_LOCALE;
	}

	const languages =
		Array.isArray(navigator.languages) && navigator.languages.length > 0
			? navigator.languages
			: [navigator.language || DEFAULT_LOCALE];

	try {
		const matched = match(languages, SUPPORTED_LOCALES, DEFAULT_LOCALE);
		if (isSupportedLocale(matched)) {
			return matched;
		}
	} catch {
		// Fall through
	}

	return DEFAULT_LOCALE;
}
