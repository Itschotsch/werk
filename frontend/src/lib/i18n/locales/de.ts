import type { Messages } from "../types";

export const de: Messages = {
	appName: "Werk",
	pageTitle: (title?: string) => (title ? `${title} | Werk` : "Werk"),
	header: {
		homeAriaLabel: (title: string) => `${title}-Startseite`,
		navAriaLabel: "Hauptnavigation",
		nav: {
			projects: "Projekte",
			creatives: "Kreative",
			explore: "Entdecken"
		},
		search: {
			inputAriaLabel: "Projekte und Kreative suchen",
			placeholder: "Suchen...",
			submit: "Suchen"
		},
		user: {
			profileAriaLabel: "Benutzerprofil",
			signIn: "Anmelden",
			register: "Registrieren",
			signOut: "Abmelden",
			greeting: (name: string) => `Hallo, ${name}`
		}
	},
	footer: {
		tagline: "Plattform für Kreative",
		navAriaLabel: "Footer-Navigation",
		nav: {
			about: "Über uns",
			guidelines: "Richtlinien",
			explore: "Entdecken",
			imprint: "Impressum"
		},
		copyright: (year: number) => `© ${year} Werk`
	},
	home: {
		databaseStatus: (status: string) => `Datenbank: ${status}`
	},
	auth: {
		login: {
			title: "Anmelden",
			identifierLabel: "E-Mail oder Benutzername",
			identifierPlaceholder: "name@beispiel.ch oder Benutzername",
			passwordLabel: "Passwort",
			submitButton: "Anmelden",
			submittingButton: "Wird angemeldet...",
			noAccountPrompt: "Noch kein Konto?",
			registerLink: "Jetzt registrieren",
			invalidCredentials: "Ungültige Anmeldedaten. Bitte überprüfen Sie Ihre Eingaben."
		},
		register: {
			title: "Registrieren",
			emailLabel: "E-Mail-Adresse",
			usernameLabel: "Benutzername",
			displayNameLabel: "Anzeigename",
			passwordLabel: "Passwort",
			passwordHint: "Mindestens 8 Zeichen",
			submitButton: "Konto erstellen",
			submittingButton: "Wird erstellt...",
			hasAccountPrompt: "Bereits registriert?",
			loginLink: "Hier anmelden",
			emailInUse: "Diese E-Mail-Adresse wird bereits verwendet.",
			usernameInUse: "Dieser Benutzername ist bereits vergeben.",
			invalidUsername:
				"Der Benutzername muss zwischen 3 und 30 Zeichen lang sein (Buchstaben, Zahlen, Bindestrich, Unterstrich).",
			invalidPassword: "Das Passwort muss mindestens 8 Zeichen lang sein.",
			welcomeMessage: (name: string) => `Willkommen bei Werk, ${name}!`
		},
		logout: {
			button: "Abmelden"
		}
	},
	profile: {
		title: (name: string) => `Profil von ${name}`,
		notFound: "Benutzer nicht gefunden",
		notFoundDescription: "Der angeforderte Benutzer existiert nicht oder wurde entfernt.",
		memberSince: (date: string) => `Mitglied seit ${date}`,
		biographyTitle: "Biographie",
		noBiography: "Noch keine Biographie vorhanden.",
		locationsTitle: "Oft besuchte Orte",
		noLocations: "Keine Orte angegeben.",
		rolesTitle: "Kreative Rollen",
		noRoles: "Keine Rollen angegeben.",
		projectsTitle: "Projekte",
		noProjects: "Noch an keinen Projekten beteiligt.",
		websiteTitle: "Webseite",
		editProfile: "Profil bearbeiten",
		closeEdit: "Bearbeiten abbrechen",
		editModalTitle: "Profil bearbeiten",
		saveChanges: "Änderungen speichern",
		saving: "Wird gespeichert...",
		successMessage: "Profil erfolgreich aktualisiert!",
		errorMessage: "Fehler beim Aktualisieren des Profils. Bitte versuchen Sie es erneut.",
		displayNameLabel: "Anzeigename",
		biographyLabel: "Biographie",
		biographyPlaceholder: "Erzählen Sie etwas über sich und Ihre kreative Arbeit...",
		locationsLabel: "Oft besuchte Orte",
		locationsHint: "Orte zeilenweise oder kommagetrennt eingeben (z.B. Zürich, Schweiz)",
		locationsPlaceholder: "Zürich, Schweiz\nBern, Schweiz",
		rolesLabel: "Kreative Rollen",
		rolesHint: "Kommagetrennte Liste (z.B. Fotograf, Regie, Model)",
		rolesPlaceholder: "Fotograf, Regie, Model",
		websiteLabel: "Webseite / Portfolio",
		websitePlaceholder: "https://meine-website.ch"
	},
	pages: {
		about: {
			title: "Über uns",
			subtitle:
				"Werk ist eine Plattform für Kreative, um einander zu finden, Portfolios zu präsentieren und interdisziplinäre Zusammenarbeit zu organisieren.",
			missionTitle: "Unsere Mission",
			missionText:
				"Werk verbindet Models mit Fotografen, Schauspieler mit Regisseuren, Designer mit Produzenten, alles an einem gemeinsamen Ort. Werk soll eine Bühne für künstlerische Projekte, Netzwerke und kollaboratives Schaffen sein.",
			creativesTitle: "Für Kreative & Kollektive",
			creativesText:
				"Egal ob Fotografie, Film, Grafik, Musik oder etwas anderes; auf Werk präsentieren Kreative ihr Portfolio, vernetzen sich mit Gleichgesinnten an ihren Standorten und finden Partner für ihr nächstes Projekt. Präsentieren Sie Ihre Arbeiten, Rollen und Projekte, finden Sie Mitwirkende für Filmdrehs, Fotografien, Ausstellungen, Theater und viel mehr, und tauschen Sie sich direkt aus, ohne Agentur oder Algorithmus.",
			openTitle: "Unabhängig & Offen",
			openText:
				"Werk legt einen hohen Wert auf Urheberrecht und Datenschutz, faire Nutzungsbedingungen und Barrierefreiheit. Die Plattform wird stetig weiterentwickelt, um der kreativen Gemeinschaft ein optimales Werkzeug bereitzustellen."
		},
		guidelines: {
			title: "Richtlinien",
			subtitle:
				"Gemeinschaftsrichtlinien für eine respektvolle, inspirierende und professionelle Zusammenarbeit auf Werk.",
			respectTitle: "1. Respekt & Professioneller Umgang",
			respectText:
				"Werk ist ein Netzwerk für Kreative aller Art, ob beruflich oder in der Freizeit. Wir erwarten einen höflichen, wertschätzenden und diskriminierungsfreien Umgang zwischen allen Mitgliedern, unabhängig von Herkunft, Geschlecht, Identität, Alter oder politischer und künstlerischer Ausrichtung.",
			copyrightTitle: "2. Urheberrecht & Einverständnis",
			copyrightText:
				"Veröffentlichen Sie nur Werke, Texte und Bildmaterialien, an denen Sie die Urheberrechte besitzen oder für die eine ausdrückliche Genehmigung der Rechteinhaber vorliegt. Achten Sie bei der Präsentation von Personenfotos stets auf das Vorliegen der notwendigen Model-Releases und Veröffentlichungsrechte.",
			authenticityTitle: "3. Authentizität & Transparenz",
			authenticityText:
				"Präsentieren Sie Ihre Rollen, Qualifikationen und Mitwirkungen an Projekten ehrlich und transparent. Geben Sie Mitwirkenden (Fotografen, Stylisten, Assistenten, Regie etc.) stets die verdiente Namensnennung (Credits).",
			standardsTitle: "4. Inhaltsstandards & Sicherheit",
			standardsText:
				"Spam, irreführende Werbung, Nachstellung, Belästigung sowie rechtswidrige oder gewaltverherrlichende Inhalte sind auf Werk strengstens untersagt. Das Veröffentlichen von vertraulichen Kontaktdaten Dritter ohne deren Einwilligung führt zur sofortigen Kontosperrung.",
			enforcementTitle: "5. Durchsetzung & Meldungen",
			enforcementText:
				"Verstöße gegen diese Richtlinien können gemeldet werden. Wir behalten uns vor, Inhalte notfalls ohne Ankündigung und Kommunikation zu entfernen oder Konten zu deaktivieren."
		},
		imprint: {
			title: "Impressum",
			contactTitle: "Kontakt",
			emailLabel: "E-Mail",
			websiteLabel: "Webseite"
		},
		projects: {
			title: "Projekte",
			placeholderText: "Projekte werden hier angezeigt."
		},
		creatives: {
			title: "Kreative",
			placeholderText: "Kreative Profile und Portfolios werden hier angezeigt."
		},
		explore: {
			title: "Entdecken",
			placeholderText: "Inhalte und Projekte entdecken."
		},
		search: {
			title: "Suchen",
			resultsFor: (query: string) => `Suchergebnisse für: ${query}`,
			placeholderText: "Suchergebnisse werden hier angezeigt."
		}
	},
	projectStatus: {
		draft: "Entwurf",
		planning: "In Planung",
		in_production: "In Produktion",
		completed: "Abgeschlossen",
		archived: "Archiviert",
		pending: "Ausstehend"
	},
	projects: {
		createNew: "+ Neues Projekt erstellen",
		createTitle: "Neues Projekt erstellen",
		searchPlaceholder: "Projekte suchen...",
		searchButton: "Suchen",
		tagsLabel: "Tags",
		tagsLabelComma: "Tags (kommagetrennt)",
		tagsPlaceholder: "z.B. Film, Fotografie, Ausstellung",
		leadershipLabel: "Projektleitung",
		noProjectsFound: "Keine Projekte gefunden.",
		backToOverview: "← Zurück zur Übersicht",
		createError: "Fehler beim Erstellen des Projekts",
		titleLabel: "Projekttitel *",
		titlePlaceholder: "z.B. Kurzfilm Dokumentation Zürich",
		descriptionLabel: "Projektbeschreibung",
		descriptionPlaceholder: "Beschreiben Sie das Vorhaben, Ziele und Konzept...",
		isPublicLabel: "Öffentlich sichtbar",
		submitting: "Wird erstellt...",
		submitCreate: "Projekt erstellen",
		allProjects: "← Alle Projekte",
		statusLabel: "Status",
		actionFailed: "Aktion fehlgeschlagen",
		description: "Beschreibung",
		noDescription: "Keine Beschreibung vorhanden.",
		tags: "Tags",
		leadership: "Projektleitung",
		participantsAndCredits: "Mitwirkende & Credits",
		unknown: "Unbekannt",
		pendingTag: "Ausstehend",
		noParticipants: "Noch keine weiteren Mitwirkenden verzeichnet.",
		addParticipant: "Mitwirkenden hinzufügen",
		userLabel: "Werk-Nutzer (Benutzername oder E-Mail)",
		userPlaceholder: "z.B. abc",
		freeTextNameLabel: "Oder Name (Freitext, falls kein Werk-Konto)",
		freeTextNamePlaceholder: "z.B. Maria Muster",
		roleLabel: "Rolle / Aufgabe *",
		rolePlaceholder: "z.B. Regie, Kamera, Sound",
		logbookTitle: "Produktions-Logbuch",
		locationLabel: "Ort",
		authoredBy: "Verfasst von",
		noLogEntries: "Keine Logbuch-Einträge vorhanden.",
		writeLogEntry: "Logbuch-Eintrag verfassen",
		logTitleLabel: "Titel *",
		logTitlePlaceholder: "z.B. Tag 1: Location Scouting",
		logLocationLabel: "Ort (optional)",
		logLocationPlaceholder: "z.B. Studio Zürich",
		logDatetimeLabel: "Datum & Uhrzeit (optional, Standard: jetzt)",
		logTextLabel: "Inhalt *",
		logTextPlaceholder: "Details zum Fortgang des Projekts...",
		publishLogEntry: "Eintrag veröffentlichen",
		blueprint: {
			figureHeader: "FIG. 01 // PROJEKTSPEZIFIKATION",
			specificationLabel: "PROJEKT / SPEZIFIKATION",
			drawingIdLabel: "ZEICHNUNGS-ID",
			scaleLabel: "MASSSTAB",
			headerLabel: "ABB. 0.1 · SPEZIFIKATION",
			headerDimension: "KOPF · 100%",
			alertLabel: "ALARM · FEHLER",
			sectionDescriptionDimension: "ABS · BESCHREIBUNG",
			sectionTagsDimension: "ABS · SCHLAGWORTE",
			sectionLeadershipDimension: "ABS · LEITUNG",
			sectionParticipantsDimension: "ABS · TEILNEHMER",
			formParticipantLabel: "FORM · TEILNEHMER",
			buttonAddDimension: "SCHALTFLÄCHE · HINZUFÜGEN",
			sectionLogbookDimension: "ABS · LOGBUCH",
			logEntryLabel: "EINTRAG",
			formLogbookLabel: "FORM · LOGBUCH",
			buttonPublishDimension: "SCHALTFLÄCHE · VERÖFFENTLICHEN",
			titleblockDimension: "STEMPEL · TITELBLOCK"
		}
	}
};
