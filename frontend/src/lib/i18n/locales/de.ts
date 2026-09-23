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
			signIn: 'Anmelden',
			register: 'Registrieren',
			signOut: 'Abmelden',
			greeting: (name: string) => `Hallo, ${name}`
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
	},
	auth: {
		login: {
			title: 'Anmelden',
			identifierLabel: 'E-Mail oder Benutzername',
			identifierPlaceholder: 'name@beispiel.ch oder Benutzername',
			passwordLabel: 'Passwort',
			submitButton: 'Anmelden',
			submittingButton: 'Wird angemeldet...',
			noAccountPrompt: 'Noch kein Konto?',
			registerLink: 'Jetzt registrieren',
			invalidCredentials: 'Ungültige Anmeldedaten. Bitte überprüfen Sie Ihre Eingaben.'
		},
		register: {
			title: 'Registrieren',
			emailLabel: 'E-Mail-Adresse',
			usernameLabel: 'Benutzername',
			displayNameLabel: 'Anzeigename',
			passwordLabel: 'Passwort',
			passwordHint: 'Mindestens 8 Zeichen',
			submitButton: 'Konto erstellen',
			submittingButton: 'Wird erstellt...',
			hasAccountPrompt: 'Bereits registriert?',
			loginLink: 'Hier anmelden',
			emailInUse: 'Diese E-Mail-Adresse wird bereits verwendet.',
			usernameInUse: 'Dieser Benutzername ist bereits vergeben.',
			invalidUsername:
				'Der Benutzername muss zwischen 3 und 30 Zeichen lang sein (Buchstaben, Zahlen, Bindestrich, Unterstrich).',
			invalidPassword: 'Das Passwort muss mindestens 8 Zeichen lang sein.',
			welcomeMessage: (name: string) => `Willkommen bei Werk, ${name}!`
		},
		logout: {
			button: 'Abmelden'
		}
	}
};
