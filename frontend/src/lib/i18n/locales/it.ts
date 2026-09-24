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
	},
	profile: {
		title: (name: string) => `Profilo di ${name}`,
		notFound: 'Utente non trovato',
		notFoundDescription: "L'utente richiesto non esiste o è stato rimosso.",
		memberSince: (date: string) => `Membro dal ${date}`,
		biographyTitle: 'Biografia',
		noBiography: 'Nessuna biografia inserita.',
		locationsTitle: 'Luoghi frequenti',
		noLocations: 'Nessun luogo specificato.',
		rolesTitle: 'Ruoli creativi',
		noRoles: 'Nessun ruolo specificato.',
		websiteTitle: 'Sito web',
		editProfile: 'Modifica profilo',
		closeEdit: 'Annulla modifica',
		editModalTitle: 'Modifica profilo',
		saveChanges: 'Salva modifiche',
		saving: 'Salvataggio...',
		successMessage: 'Profilo aggiornato con successo!',
		errorMessage: 'Aggiornamento del profilo fallito. Riprova.',
		displayNameLabel: 'Nome visualizzato',
		biographyLabel: 'Biografia',
		biographyPlaceholder: 'Raccontaci qualcosa su di te e sul tuo lavoro creativo...',
		locationsLabel: 'Luoghi frequenti',
		locationsHint: 'Inserisci i luoghi per riga o separati da virgole (es. Zurigo, Svizzera)',
		locationsPlaceholder: 'Zurigo, Svizzera\nBerna, Svizzera',
		rolesLabel: 'Ruoli creativi',
		rolesHint: 'Elenco separato da virgole (es. Fotografo, Regista, Modello)',
		rolesPlaceholder: 'Fotografo, Regista, Modello',
		websiteLabel: 'Sito web / Portfolio',
		websitePlaceholder: 'https://il-mio-sito.com'
	}
};
