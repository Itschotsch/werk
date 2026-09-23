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
			signIn: 'Accedi'
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
	}
};
