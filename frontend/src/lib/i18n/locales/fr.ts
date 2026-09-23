import type { Messages } from '../types';

export const fr: Messages = {
	header: {
		homeAriaLabel: (title: string) => `Accueil ${title}`,
		navAriaLabel: 'Navigation principale',
		nav: {
			projects: 'Projets',
			creatives: 'Créatifs',
			explore: 'Explorer'
		},
		search: {
			inputAriaLabel: 'Rechercher des projets et des créatifs',
			placeholder: 'Rechercher...',
			submit: 'Rechercher'
		},
		user: {
			profileAriaLabel: 'Profil utilisateur',
			signIn: 'Connexion'
		}
	},
	footer: {
		tagline: 'Plateforme pour les créateurs',
		navAriaLabel: 'Navigation de bas de page',
		nav: {
			about: 'À propos',
			guidelines: 'Règles',
			explore: 'Explorer',
			imprint: 'Mentions légales'
		},
		copyright: (year: number) => `© ${year} Werk`
	},
	home: {
		databaseStatus: (status: string) => `Base de données: ${status}`
	}
};
