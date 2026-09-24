export interface NavItem {
	label: string;
	href: string;
	exact?: boolean;
}

export interface UserSummary {
	displayName: string;
	username?: string;
	handle?: string;
	avatarUrl?: string;
}
