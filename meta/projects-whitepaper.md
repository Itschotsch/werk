# Whitepaper: Projekt-Architektur & Backlink-Modell für Werk

**Dokumententyp:** Konzeptionelles & Technisches Whitepaper  
**Status:** Architektur-Spezifikation (Re-evaluiert & Konsolidiert)  
**Datum:** September 2026  
**Zielgruppe:** Entwicklungs- & Produktteam  

---

## 1. Executive Summary & Vision

Auf **Werk** bilden nicht isolierte Beiträge oder statische Profile das Zentrum des Netzwerks, sondern **Projekte**. Ein Projekt repräsentiert ein reales oder geplantes kreatives Vorhaben – von Filmproduktionen über Fotoshootings, Musikkonzerte und Kunstausstellungen bis hin zu interdisziplinären Kollektivarbeiten.

Profile von Kreativen erhalten ihre Aussagekraft und Reputation durch die **Projekte, an denen sie mitgewirkt haben**. Anstatt Lebensläufe manuell zu pflegen, speist sich das Profil einer Person dynamisch aus den verknüpften **Backlinks** von Projekten.

Dieses Whitepaper konsolidiert die Architekturentscheidungen rund um:
1. **Hybride Beteiligungen** (Registrierte Nutzer vs. Freitext-Credits mit Claiming-Workflow).
2. **Differenzierte Rechtematrix** (Projektleiter `leaders`, Beteiligte `participants`, Lese-Berechtigte `viewers`).
3. **Projektstatus-Historie** (Zeitverlauf von Phasen anstelle eines statischen Feldes).
4. **Teilvariable Datumsangaben** (`PartialDate` für ungenaue oder historische Zeitpunkte).
5. **Wiederverwendbare Orts-Schemas** (Nominatim-kompatibel für Projekte und Logbucheinträge).
6. **Projekt-Logbücher & Beitrags-Notizen von Beteiligten**.
7. **Performante Backlink-Auflösung & Sortierung auf Nutzerprofilen**.

---

## 2. Analyse & Architekturentscheidungen (Debatte)

### 2.1 Hybride Beteiligte: Registrierte Nutzer vs. Freitext-Credits

**Ausgangslage:**
In der kreativen Praxis (z. B. am Filmset oder bei Fotoproduktionen) besitzen nicht alle Beteiligten (z. B. Maskenbildner, Tonassistenz, Catering) sofort ein Konto auf Werk.

**Architekturentscheidung (Claimable Credits Pattern):**
* Ein Credit-Eintrag (`participant`) speichert:
  - `user`: Optional `ObjectId` (Referenz auf ein Werk-Nutzerkonto).
  - `name`: String (Freitext-Name, falls kein Nutzerkonto verlinkt ist).
  - `role`: String (Freitext-Rolle, z. B. "Regie", "Lichtgestaltung", "Model").
  - `status`: `'confirmed'` | `'pending'` | `'declined'` | `'unlinked'`.
* **Claiming Workflow:** Meldet sich eine Freitext-Person später auf Werk an, kann die Namensübereinstimmung vorgeschlagen oder vom Projektleiter nachträglich per Klick mit dem neuen Profil verknüpft werden.

---

### 2.2 Rechtematrix & Sichtbarkeit (`leaders`, `participants`, `viewers`)

Um maximale Flexibilität bei gleichzeitigem Datenschutz zu gewährleisten, unterscheidet Werk drei Nutzer-Rollen pro Projekt:

1. **Projektleiter (`leaders`):**
   - Besitzen volle Administrativrechte am Projekt.
   - Können Projektinhalte, Status-Historie, Orte und Tags bearbeiten.
   - Können Beteiligte hinzufügen, bearbeiten oder entfernen.
   - Können Logbucheinträge verfassen, bearbeiten oder löschen.
   - *Invariante:* Jedes Projekt muss zu jeder Zeit mindestens **einen** aktiven `leader` besitzen (`leaders.length >= 1`). Verlinkung gilt für `leaders` automatisch als `confirmed`.

2. **Beteiligte (`participants`):**
   - Nach Bestätigung (`confirmed`) wird das Projekt auf ihrem Nutzerprofil verlinkt.
   - **Beitrags-Notizen & eigene Logbucheinträge:** Bestätigte Beteiligte besitzen Schreibzugriff für eigene Notizen und Logbucheinträge zu ihrem Beitrag im Projekt. Diese Notizen werden sowohl auf der Projektseite als auch auf dem Nutzerprofil angezeigt.

3. **Lese-Berechtigte (`viewers`):**
   - Explizite Liste von Nutzer-Referenzen (`viewers: Array<ObjectId>`), die Lesezugriff auf nicht-öffentliche (`isPublic: false`) oder private Entwürfe besitzen.

4. **Öffentlichkeit (`public` / `guest`):**
   - Lesezugriff auf öffentlich freigegebene Projekte.

---

### 2.3 Projektstatus-Historie (Timeline) & Profil-Sortierung

**Problemstellung:**
Ein einfaches statisches Textfeld `status: "completed"` reicht nicht aus, um den zeitlichen Verlauf eines Projekts nachzuvollziehen oder Profile präzise nach Projektabschluss zu sortieren.

**Architekturentscheidung:**
Der Projektstatus wird als **Status-Historie** (Array von Statuseinträgen) gespeichert:
```typescript
export interface IProjectStatusEntry {
	status: 'draft' | 'planning' | 'in_production' | 'completed' | 'archived';
	date: IPartialDate;
	note?: string;
}
```
* **Vorteil:** Man kann exakt nachvollziehen, wann ein Projekt in die Vorbereitung ging, wann gedreht wurde und wann es abgeschlossen (`completed`) wurde.
* **Profil-Sortierung:** Auf dem Nutzerprofil werden verknüpfte Projekte vorrangig nach dem **Datum des Projektabschlusses** (`completed`) oder der aktuellsten aktiven Phase sortiert, anstatt nach dem technischen Datenbank-Erstellungsdatum (`updatedAt`).

---

### 2.4 Teilvariable Datumsangaben (`PartialDate`)

**Ausgangslage:**
Kreative Projekte und historische Logbucheinträge finden oft zu Zeitpunkten statt, deren genaue Uhrzeit oder gar der genaue Tag nicht bekannt oder relevant ist (z. B. "2024", "September 2026", "24. September 2026" oder "24. September 2026, 20:40 Uhr").

**Architekturentscheidung:**
Alle projektrelevanten Datumsfelder (Logbuch-Zeitpunkte, Status-Historie) nutzen ein strukturiertes `PartialDate`-Objekt:

```typescript
export interface IPartialDate {
	year?: number;   // z.B. 2026
	month?: number;  // 1 - 12
	day?: number;    // 1 - 31
	hour?: number;   // 0 - 23
	minute?: number; // 0 - 59
	second?: number; // 0 - 59 (intern gespeichert, in der UI nicht angezeigt)
	timestamp: Date; // ISO Date-Objekt für Datenbank-Sortierungen
}
```

**Anzeige-Logik in der Benutzeroberfläche:**
- Nur `year` angegeben ➔ *"2026"*
- `year` & `month` angegeben ➔ *"September 2026"*
- `year`, `month` & `day` angegeben ➔ *"24. September 2026"*
- `year`, `month`, `day` & `hour` ➔ *"24. September 2026, 20:00 Uhr"*
- `year`, `month`, `day`, `hour` & `minute` ➔ *"24. September 2026, 20:40 Uhr"*
- *Hinweis:* Sekunden werden intern für die korrekte chronologische Sortierung vorgehalten, in der UI jedoch nie angezeigt.

---

### 2.5 Generisches Orts-Schema (`ILocation`)

Projekte und einzelne Logbucheinträge können geografische Standorte besitzen (z. B. Drehort, Studio, Ausstellungsraum).

Werk verwendet ein einheitliches, Nominatim- und Geocoder-kompatibles Orts-Schema:

```typescript
export interface ILocation {
	name: string;      // Freitext-Bezeichnung (z. B. "Studio Zurich", "Musterstrasse 42, Bern")
	lat?: number;      // Breitengrad
	lon?: number;      // Längengrad
	placeId?: string;  // Externe Geocoder / Nominatim ID
}
```
* **Verwendung:** Sowohl auf Projekt-Ebene (`locations: ILocation[]`) als auch auf Ebene einzelner Logbucheinträge (`location?: ILocation`).

---

### 2.6 Backlink-Auflösung auf Nutzerprofilen & Tagging-Schutz

**1. Dynamische Datenbank-Abfrage:**
Das Nutzerprofil liest verknüpfte Projekte dynamisch ab:
```javascript
Project.find({
  $or: [
    { leaders: userId },
    { 'participants.user': userId, 'participants.status': 'confirmed' }
  ]
});
```

**2. Tagging-Schutz & Einladungs-Workflow:**
* Wird ein registrierter Nutzer zu einem Projekt hinzugefügt, hat der Eintrag zunächst den Status `pending`.
* Das Projekt erscheint erst auf dem Profil des Nutzers, wenn dieser den Eintrag auf `confirmed` setzt.
* Lehnt der Nutzer ab (`declined`), wird kein Backlink angezeigt.
* Nutzer können ihre ausstehenden Verlinkungen direkt in ihrer Projekt-Übersicht verwalten. *(Hinweis: Ein allgemeines Benachrichtigungszentrum wird in einer späteren Projektphase implementiert).*

---

## 3. Vollständige Datenmodell-Spezifikation

### 3.1 TypeScript-Interfaces

```typescript
export type ProjectStatus = 'draft' | 'planning' | 'in_production' | 'completed' | 'archived';
export type ParticipantStatus = 'confirmed' | 'pending' | 'declined' | 'unlinked';

export interface IPartialDate {
	year?: number;
	month?: number;
	day?: number;
	hour?: number;
	minute?: number;
	second?: number;
	timestamp: Date;
}

export interface ILocation {
	name: string;
	lat?: number;
	lon?: number;
	placeId?: string;
}

export interface IProjectStatusEntry {
	status: ProjectStatus;
	date: IPartialDate;
	note?: string;
}

export interface IProjectParticipant {
	_id?: string;
	user?: string | IUser; // MongoDB ObjectId Referenz (optional)
	name?: string;         // Freitext-Name (falls kein User verlinkt ist)
	role: string;          // Freitext-Rolle (z. B. "Regie", "Fotograf", "Model")
	status: ParticipantStatus;
	contributionNote?: string; // Optionale Notiz/Beschreibung des Eintrags durch den Beteiligten
	addedAt: Date;
}

export interface IProjectLogEntry {
	_id?: string;
	datetime: IPartialDate;
	title: string;
	text: string;          // Markdown-Format
	author: string | IUser;
	location?: ILocation;  // Nominatim-kompatibler Ort für diesen Log-Eintrag
	attachments?: string[];
	createdAt: Date;
	updatedAt: Date;
}

export interface IProject {
	_id: string;
	title: string;
	slug: string;
	description: string;
	statusHistory: IProjectStatusEntry[];
	locations: ILocation[];
	leaders: Array<string | IUser>;     // Admins / Eigentümer
	participants: IProjectParticipant[]; // Mitwirkende / Credits
	viewers: Array<string | IUser>;      // Lese-Berechtigte für private Projekte
	logEntries: IProjectLogEntry[];
	tags: string[];
	coverUrl?: string;
	isPublic: boolean;
	createdAt: Date;
	updatedAt: Date;
}
```

---

### 3.2 Mongoose Schema & Indizes

```typescript
import { Schema, model } from 'mongoose';

const partialDateSchema = new Schema({
	year: { type: Number },
	month: { type: Number },
	day: { type: Number },
	hour: { type: Number },
	minute: { type: Number },
	second: { type: Number },
	timestamp: { type: Date, required: true, default: Date.now }
}, { _id: false });

const locationSchema = new Schema({
	name: { type: String, required: true, trim: true },
	lat: { type: Number },
	lon: { type: Number },
	placeId: { type: String }
}, { _id: false });

const statusEntrySchema = new Schema({
	status: { 
		type: String, 
		enum: ['draft', 'planning', 'in_production', 'completed', 'archived'], 
		required: true 
	},
	date: { type: partialDateSchema, required: true },
	note: { type: String, trim: true }
}, { _id: false });

const participantSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
	name: { type: String, default: '', trim: true },
	role: { type: String, required: true, trim: true },
	status: { 
		type: String, 
		enum: ['confirmed', 'pending', 'declined', 'unlinked'], 
		default: 'unlinked' 
	},
	contributionNote: { type: String, default: '', trim: true },
	addedAt: { type: Date, default: Date.now }
});

const logEntrySchema = new Schema({
	datetime: { type: partialDateSchema, required: true },
	title: { type: String, required: true, trim: true },
	text: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	location: { type: locationSchema, default: null },
	attachments: [{ type: String }]
}, { timestamps: true });

const projectSchema = new Schema({
	title: { type: String, required: true, trim: true },
	slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
	description: { type: String, default: '' },
	statusHistory: [statusEntrySchema],
	locations: [locationSchema],
	leaders: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
	participants: [participantSchema],
	viewers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	logEntries: [logEntrySchema],
	tags: [{ type: String, lowercase: true, trim: true }],
	coverUrl: { type: String, default: '' },
	isPublic: { type: Boolean, default: true }
}, { timestamps: true });

// Performance-Indizes für Backlink-Abfragen, Suche & Sortierung
projectSchema.index({ leaders: 1 });
projectSchema.index({ 'participants.user': 1, 'participants.status': 1 });
projectSchema.index({ viewers: 1 });
projectSchema.index({ isPublic: 1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ 'statusHistory.status': 1, 'statusHistory.date.timestamp': -1 });
```

---

## 4. REST-API Spezifikation

### 4.1 Projekt-Verwaltung (`/api/projects`)

| Methode | Endpunkt | Authentifizierung | Beschreibung |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/projects` | Optional | Öffentliche Projekte abfragen (Filter: Status, Ort, Tag) |
| `POST` | `/api/projects` | Erforderlich | Neues Projekt erstellen (Anmelder wird erster `leader`) |
| `GET` | `/api/projects/:idOrSlug` | Optional / Viewer | Details eines Projekts inkl. Beteiligten & Logbuch abrufen |
| `PATCH` | `/api/projects/:idOrSlug` | Leader | Projekt-Stammdaten & Status-Historie aktualisieren |
| `DELETE` | `/api/projects/:idOrSlug` | Leader | Projekt löschen oder archivieren |

### 4.2 Beteiligte, Credits & Rollen (`/api/projects/:id/participants`)

| Methode | Endpunkt | Authentifizierung | Beschreibung |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/projects/:id/participants` | Leader | Beteiligten hinzufügen (User-ID oder Freitext-Name + Rolle) |
| `DELETE` | `/api/projects/:id/participants/:participantId` | Leader | Beteiligten entfernen |
| `PATCH` | `/api/users/me/project-credits/:projectId` | Erforderlich | Eigene ausstehende Verlinkung annehmen (`confirmed`) oder anfragen (`declined`) |
| `PATCH` | `/api/projects/:id/participants/me/note` | Participant | Eigene Beitrags-Notiz (`contributionNote`) verfassen/bearbeiten |

### 4.3 Logbuch-Verwaltung (`/api/projects/:id/logs`)

| Methode | Endpunkt | Authentifizierung | Beschreibung |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/projects/:id/logs` | Leader / Participant | Logbuch-Eintrag hinzufügen (mit `PartialDate` & optionalem Ort) |
| `PATCH` | `/api/projects/:id/logs/:logId` | Leader / Autor | Logbuch-Eintrag bearbeiten |
| `DELETE` | `/api/projects/:id/logs/:logId` | Leader | Logbuch-Eintrag löschen |

---

## 5. Frontend & UI-Integration (SvelteKit)

### 5.1 Routen-Struktur
```text
frontend/src/routes/
├── projects/
│   ├── +page.svelte           # Projekt-Übersicht & Suche
│   ├── +page.server.ts
│   ├── new/
│   │   ├── +page.svelte       # Projekt erstellen Formular
│   │   └── +page.server.ts
│   └── [slug]/
│       ├── +page.svelte       # Projekt-Detailansicht (Titel, Beteiligte, Logbuch)
│       └── +page.server.ts
```

### 5.2 Einbindung auf dem Nutzerprofil (`/user/[username]`)
Die Profilseite ruft über `getUserProfile` alle verknüpften, bestätigten Projekte ab und zeigt diese übersichtlich inklusive Rolle, Auszeichnungsnotiz und Projektstatus an:

```svelte
<!-- Ungestylter Profil-Ausschnitt auf /user/[username] -->
<section>
	<h2>Projekte ({data.projects.length})</h2>
	{#if data.projects.length > 0}
		<ul>
			{#each data.projects as project (project._id)}
				<li>
					<a href="/projects/{project.slug}">{project.title}</a>
					<span>({project.role})</span>
					{#if project.latestStatus}
						<small>– {project.latestStatus.status}</small>
					{/if}
					{#if project.contributionNote}
						<p><small>{project.contributionNote}</small></p>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<p>Noch an keinen Projekten beteiligt.</p>
	{/if}
</section>
```

---

## 6. Layout- & Styling-Grundsätze
Gemäß den Systemanforderungen von Werk bleiben alle Projekt-Komponenten **vollständig ungestylt** (keine Inline-Styles oder CSS-Regeln in Stylesheets, ausgenommen funktionale Layout-Eigenschaften wie Flexbox oder Alignment).

---

## 7. Zusammenfassung & Nächste Schritte

1. **Konsolidierung abgeschlossen:** Das Modell vereint flexible historische Zeitangaben (`PartialDate`), generische Ortsangaben (`ILocation`), eine Status-Historie und ein mächtiges Rechtesystem (`leaders`, `participants`, `viewers`).
2. **Implementierungs-Stufenplan:**
   - **Phase 1:** Mongoose Modellsynthese (`Project.ts`), `PartialDate`-Helper & REST-Endpunkte.
   - **Phase 2:** Backlink-Anbindung in `getUserProfile` und ungestyltes Rendering auf `/user/[username]`.
   - **Phase 3:** Logbuch-Erstellung mit flexiblen Daten, Orten und Beitrags-Notizen für Beteiligte.
   - **Phase 4:** Karten-Anbindung über Geocoding (Nominatim).
