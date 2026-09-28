import { getContext, setContext } from "svelte";
import type { Locale, Messages } from "./types";
import { DEFAULT_LOCALE } from "./types";
import { de } from "./locales/de";
import { fr } from "./locales/fr";
import { it } from "./locales/it";
import { en } from "./locales/en";

export const dictionaries: Record<Locale, Messages> = {
	de,
	fr,
	it,
	en
};

const I18N_CONTEXT_KEY = Symbol("werk:i18n");

export class I18nManager {
	#getLocale: () => Locale;
	#overrideLocale = $state<Locale | null>(null);

	constructor(localeOrGetter: Locale | (() => Locale) = DEFAULT_LOCALE) {
		if (typeof localeOrGetter === "function") {
			this.#getLocale = localeOrGetter;
		} else {
			this.#getLocale = () => localeOrGetter;
		}
	}

	get locale(): Locale {
		return this.#overrideLocale ?? this.#getLocale();
	}

	set locale(next: Locale) {
		this.#overrideLocale = next;
	}

	get t(): Messages {
		return dictionaries[this.locale];
	}
}

export function initI18n(localeOrGetter: Locale | (() => Locale) = DEFAULT_LOCALE): I18nManager {
	const manager = new I18nManager(localeOrGetter);
	setContext(I18N_CONTEXT_KEY, manager);
	return manager;
}

export function useI18n(): I18nManager {
	const manager = getContext<I18nManager>(I18N_CONTEXT_KEY);
	if (!manager) {
		throw new Error(
			"useI18n() called outside of an active I18n context. Ensure initI18n() was called in +layout.svelte."
		);
	}
	return manager;
}
