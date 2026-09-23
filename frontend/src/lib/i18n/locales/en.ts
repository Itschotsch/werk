import type { Messages } from '../types';

export const en: Messages = {
	header: {
		homeAriaLabel: (title: string) => `${title} Home`,
		navAriaLabel: 'Main navigation',
		nav: {
			projects: 'Projects',
			creatives: 'Creatives',
			explore: 'Explore'
		},
		search: {
			inputAriaLabel: 'Search projects and creatives',
			placeholder: 'Search...',
			submit: 'Search'
		},
		user: {
			profileAriaLabel: 'User profile',
			signIn: 'Sign In'
		}
	},
	footer: {
		tagline: 'Platform for creatives',
		navAriaLabel: 'Footer navigation',
		nav: {
			about: 'About',
			guidelines: 'Guidelines',
			explore: 'Explore',
			imprint: 'Imprint'
		},
		copyright: (year: number) => `© ${year} Werk`
	},
	home: {
		databaseStatus: (status: string) => `Database: ${status}`
	}
};
