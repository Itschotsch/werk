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
			signIn: 'Connexion',
			register: "S'inscrire",
			signOut: 'Se déconnecter',
			greeting: (name: string) => `Bonjour, ${name}`
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
	},
	auth: {
		login: {
			title: 'Connexion',
			identifierLabel: "E-mail ou nom d'utilisateur",
			identifierPlaceholder: "nom@example.ch ou nom d'utilisateur",
			passwordLabel: 'Mot de passe',
			submitButton: 'Se connecter',
			submittingButton: 'Connexion en cours...',
			noAccountPrompt: 'Pas encore de compte ?',
			registerLink: 'Créer un compte',
			invalidCredentials: 'Identifiants invalides. Veuillez vérifier vos saisies.'
		},
		register: {
			title: 'Créer un compte',
			emailLabel: 'Adresse e-mail',
			usernameLabel: "Nom d'utilisateur",
			displayNameLabel: 'Nom affiché',
			passwordLabel: 'Mot de passe',
			passwordHint: 'Au moins 8 caractères',
			submitButton: 'Créer un compte',
			submittingButton: 'Création en cours...',
			hasAccountPrompt: 'Déjà inscrit ?',
			loginLink: 'Se connecter ici',
			emailInUse: 'Cette adresse e-mail est déjà utilisée.',
			usernameInUse: "Ce nom d'utilisateur est déjà pris.",
			invalidUsername:
				"Le nom d'utilisateur doit comporter entre 3 et 30 caractères (lettres, chiffres, tiret, trait de soulignement).",
			invalidPassword: 'Le mot de passe doit comporter au moins 8 caractères.',
			welcomeMessage: (name: string) => `Bienvenue sur Werk, ${name} !`
		},
		logout: {
			button: 'Se déconnecter'
		}
	}
};
