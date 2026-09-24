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
		register: string;
		signOut: string;
		greeting: (name: string) => string;
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

export interface AuthMessages {
	login: {
		title: string;
		identifierLabel: string;
		identifierPlaceholder: string;
		passwordLabel: string;
		submitButton: string;
		submittingButton: string;
		noAccountPrompt: string;
		registerLink: string;
		invalidCredentials: string;
	};
	register: {
		title: string;
		emailLabel: string;
		usernameLabel: string;
		displayNameLabel: string;
		passwordLabel: string;
		passwordHint: string;
		submitButton: string;
		submittingButton: string;
		hasAccountPrompt: string;
		loginLink: string;
		emailInUse: string;
		usernameInUse: string;
		invalidUsername: string;
		invalidPassword: string;
		welcomeMessage: (name: string) => string;
	};
	logout: {
		button: string;
	};
}

export interface ProfileMessages {
	title: (name: string) => string;
	notFound: string;
	notFoundDescription: string;
	memberSince: (date: string) => string;
	biographyTitle: string;
	noBiography: string;
	locationsTitle: string;
	noLocations: string;
	rolesTitle: string;
	noRoles: string;
	websiteTitle: string;
	editProfile: string;
	closeEdit: string;
	editModalTitle: string;
	saveChanges: string;
	saving: string;
	successMessage: string;
	errorMessage: string;
	displayNameLabel: string;
	biographyLabel: string;
	biographyPlaceholder: string;
	locationsLabel: string;
	locationsHint: string;
	locationsPlaceholder: string;
	rolesLabel: string;
	rolesHint: string;
	rolesPlaceholder: string;
	websiteLabel: string;
	websitePlaceholder: string;
}

export interface Messages {
	header: HeaderMessages;
	footer: FooterMessages;
	home: HomeMessages;
	auth: AuthMessages;
	profile: ProfileMessages;
}
