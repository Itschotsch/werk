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
	},
	profile: {
		title: (name: string) => `${name}'s Profile`,
		notFound: 'User not found',
		notFoundDescription: 'The requested user does not exist or has been removed.',
		memberSince: (date: string) => `Member since ${date}`,
		biographyTitle: 'Biography',
		noBiography: 'No biography provided yet.',
		locationsTitle: 'Frequently Visited Locations',
		noLocations: 'No locations specified.',
		rolesTitle: 'Creative Roles',
		noRoles: 'No roles specified.',
		websiteTitle: 'Website',
		editProfile: 'Edit Profile',
		closeEdit: 'Cancel Editing',
		editModalTitle: 'Edit Profile',
		saveChanges: 'Save Changes',
		saving: 'Saving...',
		successMessage: 'Profile updated successfully!',
		errorMessage: 'Failed to update profile. Please try again.',
		displayNameLabel: 'Display Name',
		biographyLabel: 'Biography',
		biographyPlaceholder: 'Tell us about yourself and your creative work...',
		locationsLabel: 'Frequently Visited Locations',
		locationsHint: 'Enter locations per line or comma-separated (e.g. Zurich, Switzerland)',
		locationsPlaceholder: 'Zurich, Switzerland\nBern, Switzerland',
		rolesLabel: 'Creative Roles',
		rolesHint: 'Comma-separated list (e.g. Photographer, Director, Model)',
		rolesPlaceholder: 'Photographer, Director, Model',
		websiteLabel: 'Website / Portfolio',
		websitePlaceholder: 'https://my-website.com'
	},
	pages: {
		about: {
			title: 'About Us',
			subtitle:
				'Werk is a platform for creatives to find one another, showcase portfolios, and organise interdisciplinary collaboration.',
			missionTitle: 'Our Mission',
			missionText:
				'Werk connects models with photographers, actors with directors, designers with producers, all in one place. Werk aims to be a stage for artistic projects, networks, and collaborative creation.',
			creativesTitle: 'For Creatives & Collectives',
			creativesText:
				'Whether photography, film, graphic design, music, or something else; on Werk, creatives showcase their portfolio, connect with like-minded people at their locations, and find partners for their next project. Showcase your work, roles, and projects, find collaborators for film shoots, photography, exhibitions, theatre, and much more, and exchange directly without an agency or algorithm.',
			openTitle: 'Independent & Open',
			openText:
				'Werk places a high value on copyright and data protection, fair terms of use, and accessibility. The platform is continuously developed to provide the creative community with an optimal tool.'
		},
		guidelines: {
			title: 'Guidelines',
			subtitle:
				'Community guidelines for respectful, inspiring, and professional collaboration on Werk.',
			respectTitle: '1. Respect & Professional Conduct',
			respectText:
				'Werk is a network for creatives of all kinds, whether professional or leisure-based. We expect polite, appreciative, and non-discriminatory interactions between all members, regardless of background, gender, identity, age, or political and artistic orientation.',
			copyrightTitle: '2. Copyright & Consent',
			copyrightText:
				'Only publish works, texts, and images for which you hold the copyright or have express permission from the rights holder. When presenting photos of individuals, always ensure that necessary model releases and publishing rights are in place.',
			authenticityTitle: '3. Authenticity & Transparency',
			authenticityText:
				'Present your roles, qualifications, and contributions to projects honestly and transparently. Always give collaborators (photographers, stylists, assistants, directors, etc.) the credit they deserve.',
			standardsTitle: '4. Content Standards & Safety',
			standardsText:
				'Spam, misleading advertising, stalking, harassment, as well as unlawful or violent content are strictly prohibited on Werk. Publishing confidential contact details of third parties without consent will result in immediate account suspension.',
			enforcementTitle: '5. Enforcement & Reporting',
			enforcementText:
				'Violations of these guidelines can be reported. We reserve the right to remove content without prior notice or communication, or to deactivate accounts if necessary.'
		},
		imprint: {
			title: 'Imprint',
			contactTitle: 'Contact',
			emailLabel: 'Email',
			websiteLabel: 'Website'
		},
		projects: {
			title: 'Projects',
			placeholderText: 'Projects will be displayed here.'
		},
		creatives: {
			title: 'Creatives',
			placeholderText: 'Creative profiles and portfolios will be displayed here.'
		},
		explore: {
			title: 'Explore',
			placeholderText: 'Explore content and projects.'
		},
		search: {
			title: 'Search',
			resultsFor: (query: string) => `Search results for: ${query}`,
			placeholderText: 'Search results will be displayed here.'
		}
	}
};
