import type { Messages } from '../types';

export const de: Messages = {
	header: {
		homeAriaLabel: (title: string) => `${title}-Startseite`,
		navAriaLabel: 'Hauptnavigation',
		nav: {
			projects: 'Projekte',
			creatives: 'Kreative',
			explore: 'Entdecken'
		},
		search: {
			inputAriaLabel: 'Projekte und Kreative suchen',
			placeholder: 'Suchen...',
			submit: 'Suchen'
		},
		user: {
			profileAriaLabel: 'Benutzerprofil',
			signIn: 'Anmelden'
		}
	},
	footer: {
		tagline: 'Plattform für Kreative',
		navAriaLabel: 'Footer-Navigation',
		nav: {
			about: 'Über uns',
			guidelines: 'Richtlinien',
			explore: 'Entdecken',
			imprint: 'Impressum'
		},
		copyright: (year: number) => `© ${year} Werk`
	},
	home: {
		databaseStatus: (status: string) => `Datenbank: ${status}`
	}
};
