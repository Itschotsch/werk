import type { IProjectBacklink } from "./project.js";

export interface UserLocation {
	name: string;
	lat?: number;
	lon?: number;
	placeId?: string;
}

export interface UserProfile {
	id: string;
	username: string;
	displayName: string;
	biography: string;
	locations: UserLocation[];
	roles: string[];
	website: string;
	avatarUrl: string;
	createdAt: string;
	isOwner: boolean;
	projects?: IProjectBacklink[];
}

export interface UpdateProfileRequest {
	displayName?: string;
	biography?: string;
	locations?: UserLocation[];
	roles?: string[];
	website?: string;
	avatarUrl?: string;
}
