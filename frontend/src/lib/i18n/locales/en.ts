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
			signIn: 'Sign in',
			register: 'Register',
			signOut: 'Sign out',
			greeting: (name: string) => `Hello, ${name}`
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
	},
	auth: {
		login: {
			title: 'Sign In',
			identifierLabel: 'Email or username',
			identifierPlaceholder: 'name@example.com or username',
			passwordLabel: 'Password',
			submitButton: 'Sign In',
			submittingButton: 'Signing in...',
			noAccountPrompt: "Don't have an account?",
			registerLink: 'Register now',
			invalidCredentials: 'Invalid credentials. Please check your details.'
		},
		register: {
			title: 'Create Account',
			emailLabel: 'Email address',
			usernameLabel: 'Username',
			displayNameLabel: 'Display name',
			passwordLabel: 'Password',
			passwordHint: 'At least 8 characters',
			submitButton: 'Create Account',
			submittingButton: 'Creating account...',
			hasAccountPrompt: 'Already registered?',
			loginLink: 'Sign in here',
			emailInUse: 'This email address is already in use.',
			usernameInUse: 'This username is already taken.',
			invalidUsername: 'Username must be 3-30 characters (letters, numbers, hyphens, underscores).',
			invalidPassword: 'Password must be at least 8 characters long.',
			welcomeMessage: (name: string) => `Welcome to Werk, ${name}!`
		},
		logout: {
			button: 'Sign Out'
		}
	}
};
