import type { Messages } from "../types";

export const fr: Messages = {
	appName: "Werk",
	pageTitle: (title?: string) => (title ? `${title} | Werk` : "Werk"),
	header: {
		homeAriaLabel: (title: string) => `Accueil ${title}`,
		navAriaLabel: "Navigation principale",
		nav: {
			projects: "Projets",
			creatives: "Créatifs",
			explore: "Explorer"
		},
		search: {
			inputAriaLabel: "Rechercher des projets et des créatifs",
			placeholder: "Rechercher...",
			submit: "Rechercher"
		},
		user: {
			profileAriaLabel: "Profil utilisateur",
			signIn: "Connexion",
			register: "S'inscrire",
			signOut: "Se déconnecter",
			greeting: (name: string) => `Bonjour, ${name}`
		}
	},
	footer: {
		tagline: "Plateforme pour les créateurs",
		navAriaLabel: "Navigation de bas de page",
		nav: {
			about: "À propos",
			guidelines: "Règles",
			explore: "Explorer",
			imprint: "Mentions légales"
		},
		copyright: (year: number) => `© ${year} Werk`
	},
	home: {
		databaseStatus: (status: string) => `Base de données: ${status}`
	},
	auth: {
		login: {
			title: "Connexion",
			identifierLabel: "E-mail ou nom d'utilisateur",
			identifierPlaceholder: "nom@example.ch ou nom d'utilisateur",
			passwordLabel: "Mot de passe",
			submitButton: "Se connecter",
			submittingButton: "Connexion en cours...",
			noAccountPrompt: "Pas encore de compte ?",
			registerLink: "Créer un compte",
			invalidCredentials: "Identifiants invalides. Veuillez vérifier vos saisies."
		},
		register: {
			title: "Créer un compte",
			emailLabel: "Adresse e-mail",
			usernameLabel: "Nom d'utilisateur",
			displayNameLabel: "Nom affiché",
			passwordLabel: "Mot de passe",
			passwordHint: "Au moins 8 caractères",
			submitButton: "Créer un compte",
			submittingButton: "Création en cours...",
			hasAccountPrompt: "Déjà inscrit ?",
			loginLink: "Se connecter ici",
			emailInUse: "Cette adresse e-mail est déjà utilisée.",
			usernameInUse: "Ce nom d'utilisateur est déjà pris.",
			invalidUsername:
				"Le nom d'utilisateur doit comporter entre 3 et 30 caractères (lettres, chiffres, tiret, trait de soulignement).",
			invalidPassword: "Le mot de passe doit comporter au moins 8 caractères.",
			welcomeMessage: (name: string) => `Bienvenue sur Werk, ${name} !`
		},
		logout: {
			button: "Se déconnecter"
		}
	},
	profile: {
		title: (name: string) => `Profil de ${name}`,
		notFound: "Utilisateur non trouvé",
		notFoundDescription: "L'utilisateur demandé n'existe pas ou a été supprimé.",
		memberSince: (date: string) => `Membre depuis le ${date}`,
		biographyTitle: "Biographie",
		noBiography: "Aucune biographie fournie pour le moment.",
		locationsTitle: "Lieux fréquents",
		noLocations: "Aucun lieu spécifié.",
		rolesTitle: "Rôles créatifs",
		noRoles: "Aucun rôle spécifié.",
		projectsTitle: "Projets",
		noProjects: "Inscrit dans aucun projet pour le moment.",
		websiteTitle: "Site web",
		editProfile: "Modifier le profil",
		closeEdit: "Annuler la modification",
		editModalTitle: "Modifier le profil",
		saveChanges: "Enregistrer les modifications",
		saving: "Enregistrement...",
		successMessage: "Profil mis à jour avec succès !",
		errorMessage: "Échec de la mise à jour du profil. Veuillez réessayer.",
		displayNameLabel: "Nom affiché",
		biographyLabel: "Biographie",
		biographyPlaceholder: "Racontez-nous quelque chose sur vous et votre travail créatif...",
		locationsLabel: "Lieux fréquents",
		locationsHint: "Entrez les lieux par ligne ou séparés par des virgules (ex. Zurich, Suisse)",
		locationsPlaceholder: "Zurich, Suisse\nBerne, Suisse",
		rolesLabel: "Rôles créatifs",
		rolesHint: "Liste séparée par des virgules (ex. Photographe, Réalisateur, Modèle)",
		rolesPlaceholder: "Photographe, Réalisateur, Modèle",
		websiteLabel: "Site web / Portfolio",
		websitePlaceholder: "https://mon-site-web.com"
	},
	pages: {
		about: {
			title: "À propos de nous",
			subtitle:
				"Werk est une plateforme permettant aux créatifs de se trouver, de présenter leurs portfolios et d’organiser une collaboration interdisciplinaire.",
			missionTitle: "Notre mission",
			missionText:
				"Werk connecte les modèles avec les photographes, les comédiens avec les réalisateurs, les designers avec les producteurs, le tout en un seul endroit. Werk a pour vocation d’être une scène pour les projets artistiques, les réseaux et la création collaborative.",
			creativesTitle: "Pour les créatifs & collectifs",
			creativesText:
				"Qu’il s’agisse de photographie, de cinéma, de graphisme, de musique ou d’autre chose ; sur Werk, les créatifs présentent leur portfolio, se mettent en réseau avec des personnes partageant les mêmes idées sur leurs lieux d’activité et trouvent des partenaires pour leur prochain projet. Présentez vos travaux, rôles et projets, trouvez des collaborateurs pour des tournages, photos, expositions, pièces de théâtre et bien plus encore, et échangez directement sans agence ni algorithme.",
			openTitle: "Indépendant & ouvert",
			openText:
				"Werk accorde une grande importance au droit d’auteur, à la protection des données, à des conditions d’utilisation équitables et à l’accessibilité. La plateforme est constamment développée afin de fournir un outil optimal à la communauté créative."
		},
		guidelines: {
			title: "Règles de la communauté",
			subtitle:
				"Règles de la communauté pour une collaboration respectueuse, inspirante et professionnelle sur Werk.",
			respectTitle: "1. Respect & conduite professionnelle",
			respectText:
				"Werk est un réseau pour les créatifs de tous horizons, qu’ils soient professionnels ou amateurs. Nous attendons des interactions courtoises, respectueuses et non discriminatoires entre tous les membres, indépendamment de leur origine, genre, identité, âge ou orientation politique et artistique.",
			copyrightTitle: "2. Droit d’auteur & consentement",
			copyrightText:
				"Ne publiez que des œuvres, textes et images dont vous détentez les droits d’auteur ou pour lesquels vous disposez d’une autorisation expresse du ayant droit. Lors de la présentation de photos de personnes, veillez toujours à disposer des autorisations à l’image (model release) et droits de publication nécessaires.",
			authenticityTitle: "3. Authenticité & transparence",
			authenticityText:
				"Présentez vos rôles, qualifications et contributions aux projets de manière honnête et transparente. Accordez toujours aux collaborateurs (photographes, stylistes, assistants, réalisateurs, etc.) le crédit qu’ils méritent.",
			standardsTitle: "4. Normes de contenu & sécurité",
			standardsText:
				"Le spam, la publicité mensongère, le harcèlement, la traque ainsi que les contenus illégaux ou violents sont strictement interdits sur Werk. La publication de coordonnées confidentielles de tiers sans leur consentement entraînera la suspension immédiate du compte.",
			enforcementTitle: "5. Application & signalements",
			enforcementText:
				"Les violations de ces règles peuvent être signalées. Nous nous réservons le droit de supprimer du contenu sans préavis ni communication, ou de désactiver des comptes si nécessaire."
		},
		imprint: {
			title: "Mentions légales",
			contactTitle: "Contact",
			emailLabel: "E-mail",
			websiteLabel: "Site web"
		},
		projects: {
			title: "Projets",
			placeholderText: "Les projets seront affichés ici."
		},
		creatives: {
			title: "Créatifs",
			placeholderText: "Les profils et portfolios des créatifs seront affichés ici."
		},
		explore: {
			title: "Explorer",
			placeholderText: "Explorer le contenu et les projets."
		},
		search: {
			title: "Recherche",
			resultsFor: (query: string) => `Résultats de recherche pour : ${query}`,
			placeholderText: "Les résultats de recherche seront affichés ici."
		}
	},
	projectStatus: {
		draft: "Brouillon",
		planning: "En planification",
		in_production: "En production",
		completed: "Terminé",
		archived: "Archivé",
		pending: "En attente"
	},
	projects: {
		createNew: "+ Créer un nouveau projet",
		createTitle: "Créer un nouveau projet",
		searchPlaceholder: "Rechercher des projets...",
		searchButton: "Rechercher",
		tagsLabel: "Mots-clés",
		tagsLabelComma: "Mots-clés (séparés par des virgules)",
		tagsPlaceholder: "ex. Film, Photographie, Exposition",
		leadershipLabel: "Direction du projet",
		noProjectsFound: "Aucun projet trouvé.",
		backToOverview: "← Retour à la vue d'ensemble",
		createError: "Erreur lors de la création du projet",
		titleLabel: "Titre du projet *",
		titlePlaceholder: "ex. Court-métrage documentaire Zurich",
		descriptionLabel: "Description du projet",
		descriptionPlaceholder: "Décrivez le projet, les objectifs et le concept...",
		isPublicLabel: "Visible publiquement",
		submitting: "Création en cours...",
		submitCreate: "Créer le projet",
		allProjects: "← Tous les projets",
		statusLabel: "Statut",
		actionFailed: "Échec de l'action",
		description: "Description",
		noDescription: "Aucune description fournie.",
		tags: "Mots-clés",
		leadership: "Direction du projet",
		participantsAndCredits: "Participants & Crédits",
		unknown: "Inconnu",
		pendingTag: "En attente",
		noParticipants: "Aucun autre participant enregistré pour le moment.",
		addParticipant: "Ajouter un participant",
		userLabel: "Utilisateur Werk (Nom d'utilisateur ou e-mail)",
		userPlaceholder: "ex. abc",
		freeTextNameLabel: "Ou nom (Texte libre si pas de compte Werk)",
		freeTextNamePlaceholder: "ex. Marie Dupont",
		roleLabel: "Rôle / Tâche *",
		rolePlaceholder: "ex. Réalisation, Caméra, Son",
		logbookTitle: "Journal de production",
		locationLabel: "Lieu",
		authoredBy: "Rédigé par",
		noLogEntries: "Aucune entrée dans le journal.",
		writeLogEntry: "Rédiger une entrée de journal",
		logTitleLabel: "Titre *",
		logTitlePlaceholder: "ex. Jour 1 : Repérage des lieux",
		logLocationLabel: "Lieu (optionnel)",
		logLocationPlaceholder: "ex. Studio Zurich",
		logDatetimeLabel: "Date & heure (optionnel, par défaut : maintenant)",
		logTextLabel: "Contenu *",
		logTextPlaceholder: "Détails sur l'avancement du projet...",
		publishLogEntry: "Publier l'entrée"
	}
};
