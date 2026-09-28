import type { Messages } from "../types";

export const it: Messages = {
	header: {
		homeAriaLabel: (title: string) => `Home page di ${title}`,
		navAriaLabel: "Navigazione principale",
		nav: {
			projects: "Progetti",
			creatives: "Creativi",
			explore: "Esplora"
		},
		search: {
			inputAriaLabel: "Cerca progetti e creativi",
			placeholder: "Cerca...",
			submit: "Cerca"
		},
		user: {
			profileAriaLabel: "Profilo utente",
			signIn: "Accedi",
			register: "Registrati",
			signOut: "Disconnetti",
			greeting: (name: string) => `Ciao, ${name}`
		}
	},
	footer: {
		tagline: "Piattaforma per i creativi",
		navAriaLabel: "Navigazione a piè di pagina",
		nav: {
			about: "Chi siamo",
			guidelines: "Linee guida",
			explore: "Esplora",
			imprint: "Note legali"
		},
		copyright: (year: number) => `© ${year} Werk`
	},
	home: {
		databaseStatus: (status: string) => `Database: ${status}`
	},
	auth: {
		login: {
			title: "Accedi",
			identifierLabel: "E-mail o nome utente",
			identifierPlaceholder: "nome@example.ch o nome utente",
			passwordLabel: "Password",
			submitButton: "Accedi",
			submittingButton: "Accesso in corso...",
			noAccountPrompt: "Non hai un account?",
			registerLink: "Registrati ora",
			invalidCredentials: "Credenziali non valide. Verifica i tuoi dati."
		},
		register: {
			title: "Registrati",
			emailLabel: "Indirizzo e-mail",
			usernameLabel: "Nome utente",
			displayNameLabel: "Nome visualizzato",
			passwordLabel: "Password",
			passwordHint: "Almeno 8 caratteri",
			submitButton: "Crea account",
			submittingButton: "Creazione in corso...",
			hasAccountPrompt: "Hai già un account?",
			loginLink: "Accedi qui",
			emailInUse: "Questo indirizzo e-mail è già in uso.",
			usernameInUse: "Questo nome utente è già occupato.",
			invalidUsername:
				"Il nome utente deve avere tra 3 e 30 caratteri (lettere, numeri, trattini, trattini bassi).",
			invalidPassword: "La password deve contenere almeno 8 caratteri.",
			welcomeMessage: (name: string) => `Benvenuto su Werk, ${name}!`
		},
		logout: {
			button: "Disconnetti"
		}
	},
	profile: {
		title: (name: string) => `Profilo di ${name}`,
		notFound: "Utente non trovato",
		notFoundDescription: "L'utente richiesto non esiste o è stato rimosso.",
		memberSince: (date: string) => `Membro dal ${date}`,
		biographyTitle: "Biografia",
		noBiography: "Nessuna biografia inserita.",
		locationsTitle: "Luoghi frequenti",
		noLocations: "Nessun luogo specificato.",
		rolesTitle: "Ruoli creativi",
		noRoles: "Nessun ruolo specificato.",
		projectsTitle: "Progetti",
		noProjects: "Non ancora coinvolto in alcun progetto.",
		websiteTitle: "Sito web",
		editProfile: "Modifica profilo",
		closeEdit: "Annulla modifica",
		editModalTitle: "Modifica profilo",
		saveChanges: "Salva modifiche",
		saving: "Salvataggio...",
		successMessage: "Profilo aggiornato con successo!",
		errorMessage: "Aggiornamento del profilo fallito. Riprova.",
		displayNameLabel: "Nome visualizzato",
		biographyLabel: "Biografia",
		biographyPlaceholder: "Raccontaci qualcosa su di te e sul tuo lavoro creativo...",
		locationsLabel: "Luoghi frequenti",
		locationsHint: "Inserisci i luoghi per riga o separati da virgole (es. Zurigo, Svizzera)",
		locationsPlaceholder: "Zurigo, Svizzera\nBerna, Svizzera",
		rolesLabel: "Ruoli creativi",
		rolesHint: "Elenco separato da virgole (es. Fotografo, Regista, Modello)",
		rolesPlaceholder: "Fotografo, Regista, Modello",
		websiteLabel: "Sito web / Portfolio",
		websitePlaceholder: "https://il-mio-sito.com"
	},
	pages: {
		about: {
			title: "Chi siamo",
			subtitle:
				"Werk è una piattaforma pensata per permettere ai creativi di trovarsi, mostrare i propri portfolio e organizzare collaborazioni interdisciplinari.",
			missionTitle: "La nostra missione",
			missionText:
				"Werk connette modelli con fotografi, attori con registi, designer con produttori, tutti in un unico luogo. Werk vuole essere un palcoscenico per progetti artistici, relazioni e creazione collaborativa.",
			creativesTitle: "Per creativi e collettivi",
			creativesText:
				"Che si tratti di fotografia, cinema, grafica, musica o altro; su Werk i creativi mostrano il proprio portfolio, entrano in contatto con persone con gli stessi interessi nei propri luoghi di attività e trovano partner per il prossimo progetto. Presenta i tuoi lavori, ruoli e progetti, trova collaboratori per riprese, servizi fotografici, mostre, teatro e molto altro, e confrontati direttamente senza agenzie o algoritmi.",
			openTitle: "Indipendente e aperto",
			openText:
				"Werk attribuisce grande importanza al diritto d’autore, alla protezione dei dati, a condizioni d’uso eque e all’accessibilità. La piattaforma viene continuamente sviluppata per offrire alla comunità creativa uno strumento ottimale."
		},
		guidelines: {
			title: "Linee guida",
			subtitle:
				"Linee guida della community per una collaborazione rispettosa, ispiratrice e professionale su Werk.",
			respectTitle: "1. Rispetto e condotta professionale",
			respectText:
				"Werk è una rete per creativi di ogni tipo, sia a livello professionale sia amatoriale. Ci aspettiamo un’interazione cortese, di stima e non discriminatoria tra tutti i membri, indipendentemente da origine, genere, identità, età o orientamento politico e artistico.",
			copyrightTitle: "2. Diritto d’autore e consenso",
			copyrightText:
				"Pubblica solo opere, testi e immagini di cui detieni i diritti d’autore o per i quali disponi dell’autorizzazione espressa dei titolari dei diritti. Nella presentazione di foto di persone, assicurati sempre della presenza delle necessarie liberatorie (model release) e dei diritti di pubblicazione.",
			authenticityTitle: "3. Autenticità e trasparenza",
			authenticityText:
				"Presenta i tuoi ruoli, le qualifiche e i contributi ai progetti in modo onesto e trasparente. Riconosci sempre ai collaboratori (fotografi, stylist, assistenti, registi, ecc.) i crediti meritati.",
			standardsTitle: "4. Standard di contenuto e sicurezza",
			standardsText:
				"Spam, pubblicità ingannevole, persecuzione, molestie e contenuti illeciti o violenti sono severamente vietati su Werk. La pubblicazione di dati di contatto riservati di terzi senza il loro consenso comporta la sospensione immediata dell’account.",
			enforcementTitle: "5. Applicazione e segnalazioni",
			enforcementText:
				"Le violazioni di queste linee guida possono essere segnalate. Ci riserviamo il diritto di rimuovere contenuti senza preavviso né comunicazione o di disattivare account se necessario."
		},
		imprint: {
			title: "Note legali",
			contactTitle: "Contatto",
			emailLabel: "E-mail",
			websiteLabel: "Sito web"
		},
		projects: {
			title: "Progetti",
			placeholderText: "I progetti verranno mostrati qui."
		},
		creatives: {
			title: "Creativi",
			placeholderText: "I profili e i portfolio dei creativi verranno mostrati qui."
		},
		explore: {
			title: "Esplora",
			placeholderText: "Esplora contenuti e progetti."
		},
		search: {
			title: "Cerca",
			resultsFor: (query: string) => `Risultati della ricerca per: ${query}`,
			placeholderText: "I risultati della ricerca verranno mostrati qui."
		}
	},
	projectStatus: {
		draft: "Bozza",
		planning: "In pianificazione",
		in_production: "In produzione",
		completed: "Completato",
		archived: "Archiviato",
		pending: "In attesa"
	},
	projects: {
		createNew: "+ Crea nuovo progetto",
		createTitle: "Crea nuovo progetto",
		searchPlaceholder: "Cerca progetti...",
		searchButton: "Cerca",
		tagsLabel: "Tag",
		tagsLabelComma: "Tag (separati da virgola)",
		tagsPlaceholder: "es. Film, Fotografia, Mostra",
		leadershipLabel: "Direzione del progetto",
		noProjectsFound: "Nessun progetto trovato.",
		backToOverview: "← Torna alla panoramica",
		createError: "Errore durante la creazione del progetto",
		titleLabel: "Titolo del progetto *",
		titlePlaceholder: "es. Cortometraggio documentario Zurigo",
		descriptionLabel: "Descrizione del progetto",
		descriptionPlaceholder: "Descrivi il progetto, gli obiettivi e il concetto...",
		isPublicLabel: "Visibile pubblicamente",
		submitting: "Creazione in corso...",
		submitCreate: "Crea progetto",
		allProjects: "← Tutti i progetti",
		statusLabel: "Stato",
		actionFailed: "Azione non riuscita",
		description: "Descrizione",
		noDescription: "Nessuna descrizione fornita.",
		tags: "Tag",
		leadership: "Direzione del progetto",
		participantsAndCredits: "Partecipanti & Crediti",
		unknown: "Sconosciuto",
		pendingTag: "In attesa",
		noParticipants: "Nessun altro partecipante registrato al momento.",
		addParticipant: "Aggiungi partecipante",
		userLabel: "Utente Werk (Nome utente o e-mail)",
		userPlaceholder: "es. abc",
		freeTextNameLabel: "O nome (Testo libero se non ha un account Werk)",
		freeTextNamePlaceholder: "es. Maria Rossi",
		roleLabel: "Ruolo / Compito *",
		rolePlaceholder: "es. Regia, Fotografia, Audio",
		logbookTitle: "Diario di produzione",
		locationLabel: "Luogo",
		authoredBy: "Scritto da",
		noLogEntries: "Nessun elemento nel diario.",
		writeLogEntry: "Scrivi elemento del diario",
		logTitleLabel: "Titolo *",
		logTitlePlaceholder: "es. Giorno 1: Sopralluogo",
		logLocationLabel: "Luogo (opzionale)",
		logLocationPlaceholder: "es. Studio Zurigo",
		logDatetimeLabel: "Data & ora (opzionale, predefinito: ora)",
		logTextLabel: "Contenuto *",
		logTextPlaceholder: "Dettagli sullo stato di avanzamento del progetto...",
		publishLogEntry: "Pubblica elemento"
	}
};
