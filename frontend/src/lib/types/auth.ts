export interface UserSession {
	id: string;
	email: string;
	username: string;
	displayName: string;
}

export interface AuthSuccessResponse {
	user: UserSession;
	token: string;
	expiresAt: string;
}

export interface AuthErrorResponse {
	error: string;
	message: string;
}
