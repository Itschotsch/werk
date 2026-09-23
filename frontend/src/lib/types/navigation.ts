export interface NavItem {
	label: string;
	href: string;
	exact?: boolean;
}

export interface UserSummary {
	displayName: string;
	handle?: string;
	avatarUrl?: string;
}
