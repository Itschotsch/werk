export const SUPPORTED_LOCALES = ['de', 'fr', 'it', 'en'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'de';

export function isSupportedLocale(value: unknown): value is Locale {
	return typeof value === 'string' && SUPPORTED_LOCALES.includes(value as Locale);
}

export interface HeaderMessages {
	homeAriaLabel: (title: string) => string;
	navAriaLabel: string;
	nav: {
		projects: string;
		creatives: string;
		explore: string;
	};
	search: {
		inputAriaLabel: string;
		placeholder: string;
		submit: string;
	};
	user: {
		profileAriaLabel: string;
		signIn: string;
	};
}

export interface FooterMessages {
	tagline: string;
	navAriaLabel: string;
	nav: {
		about: string;
		guidelines: string;
		explore: string;
		imprint: string;
	};
	copyright: (year: number) => string;
}

export interface HomeMessages {
	databaseStatus: (status: string) => string;
}

export interface Messages {
	header: HeaderMessages;
	footer: FooterMessages;
	home: HomeMessages;
}
