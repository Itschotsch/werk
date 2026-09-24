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
}

export interface UpdateProfileRequest {
	displayName?: string;
	biography?: string;
	locations?: UserLocation[];
	roles?: string[];
	website?: string;
	avatarUrl?: string;
}
