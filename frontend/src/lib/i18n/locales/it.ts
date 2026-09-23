import type { Messages } from '../types';

export const it: Messages = {
	header: {
		homeAriaLabel: (title: string) => `Home page di ${title}`,
		navAriaLabel: 'Navigazione principale',
		nav: {
			projects: 'Progetti',
			creatives: 'Creativi',
			explore: 'Esplora'
		},
		search: {
			inputAriaLabel: 'Cerca progetti e creativi',
			placeholder: 'Cerca...',
			submit: 'Cerca'
		},
		user: {
			profileAriaLabel: 'Profilo utente',
			signIn: 'Accedi',
			register: 'Registrati',
			signOut: 'Disconnetti',
			greeting: (name: string) => `Ciao, ${name}`
		}
	},
	footer: {
		tagline: 'Piattaforma per i creativi',
		navAriaLabel: 'Navigazione a piè di pagina',
		nav: {
			about: 'Chi siamo',
			guidelines: 'Linee guida',
			explore: 'Esplora',
			imprint: 'Note legali'
		},
		copyright: (year: number) => `© ${year} Werk`
	},
	home: {
		databaseStatus: (status: string) => `Database: ${status}`
	},
	auth: {
		login: {
			title: 'Accedi',
			identifierLabel: 'E-mail o nome utente',
			identifierPlaceholder: 'nome@example.ch o nome utente',
			passwordLabel: 'Password',
			submitButton: 'Accedi',
			submittingButton: 'Accesso in corso...',
			noAccountPrompt: 'Non hai un account?',
			registerLink: 'Registrati ora',
			invalidCredentials: 'Credenziali non valide. Verifica i tuoi dati.'
		},
		register: {
			title: 'Registrati',
			emailLabel: 'Indirizzo e-mail',
			usernameLabel: 'Nome utente',
			displayNameLabel: 'Nome visualizzato',
			passwordLabel: 'Password',
			passwordHint: 'Almeno 8 caratteri',
			submitButton: 'Crea account',
			submittingButton: 'Creazione in corso...',
			hasAccountPrompt: 'Hai già un account?',
			loginLink: 'Accedi qui',
			emailInUse: 'Questo indirizzo e-mail è già in uso.',
			usernameInUse: 'Questo nome utente è già occupato.',
			invalidUsername:
				'Il nome utente deve avere tra 3 e 30 caratteri (lettere, numeri, trattini, trattini bassi).',
			invalidPassword: 'La password deve contenere almeno 8 caratteri.',
			welcomeMessage: (name: string) => `Benvenuto su Werk, ${name}!`
		},
		logout: {
			button: 'Disconnetti'
		}
	}
};
