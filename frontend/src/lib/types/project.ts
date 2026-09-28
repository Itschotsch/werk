export type ProjectStatus = "draft" | "planning" | "in_production" | "completed" | "archived";
export type ParticipantStatus = "confirmed" | "pending" | "declined" | "unlinked";

export interface IPartialDate {
	year?: number;
	month?: number;
	day?: number;
	hour?: number;
	minute?: number;
	second?: number;
	timestamp: string;
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
	user?: {
		id: string;
		username: string;
		displayName: string;
		avatarUrl?: string;
	} | null;
	name?: string;
	role: string;
	status: ParticipantStatus;
	contributionNote?: string;
	addedAt: string;
}

export interface IProjectLogEntry {
	_id?: string;
	datetime: IPartialDate;
	title: string;
	text: string;
	author: {
		id: string;
		username: string;
		displayName: string;
		avatarUrl?: string;
	};
	location?: ILocation;
	attachments?: string[];
	createdAt?: string;
}

export interface IProject {
	id: string;
	title: string;
	description: string;
	statusHistory: IProjectStatusEntry[];
	locations: ILocation[];
	leaders: {
		id: string;
		username: string;
		displayName: string;
		avatarUrl?: string;
	}[];
	participants: IProjectParticipant[];
	logEntries: IProjectLogEntry[];
	tags: string[];
	coverUrl?: string;
	isPublic: boolean;
	createdAt: string;
	updatedAt: string;
	isLeader?: boolean;
}

export interface IProjectBacklink {
	id: string;
	title: string;
	role: string;
	status?: ParticipantStatus;
	contributionNote?: string;
	latestStatus?: IProjectStatusEntry | null;
	updatedAt: string;
}
