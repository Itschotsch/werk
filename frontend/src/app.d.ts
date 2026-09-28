// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Locale } from "$lib/i18n";
import type { UserSession } from "$lib/types/auth";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locale;
			user: UserSession | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
