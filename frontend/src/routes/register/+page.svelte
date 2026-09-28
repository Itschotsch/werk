<script lang="ts">
	import type { ActionData } from "./$types";
	import { useI18n } from "$lib/i18n";

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();

	const i18n = useI18n();

	function getErrorMessage(errorCode?: string): string | null {
		if (!errorCode) return null;
		switch (errorCode) {
			case "EMAIL_IN_USE":
				return i18n.t.auth.register.emailInUse;
			case "USERNAME_IN_USE":
				return i18n.t.auth.register.usernameInUse;
			case "INVALID_USERNAME":
				return i18n.t.auth.register.invalidUsername;
			case "INVALID_PASSWORD":
				return i18n.t.auth.register.invalidPassword;
			default:
				return i18n.t.auth.login.invalidCredentials;
		}
	}
</script>

<svelte:head>
	<title>{i18n.t.pageTitle(i18n.t.auth.register.title)}</title>
</svelte:head>

<section class="auth-container">
	<h1>{i18n.t.auth.register.title}</h1>

	{#if form?.error}
		<div role="alert" class="alert">
			<p>{getErrorMessage(form.error)}</p>
		</div>
	{/if}

	<form method="POST" class="auth-form">
		<div class="form-field">
			<label for="email">{i18n.t.auth.register.emailLabel}</label>
			<input
				type="email"
				id="email"
				name="email"
				required
				autocomplete="email"
				value={form?.email ?? ""}
			/>
		</div>

		<div class="form-field">
			<label for="username">{i18n.t.auth.register.usernameLabel}</label>
			<input
				type="text"
				id="username"
				name="username"
				required
				autocomplete="username"
				pattern={"[a-zA-Z0-9_-]{3,30}"}
				value={form?.username ?? ""}
			/>
		</div>

		<div class="form-field">
			<label for="displayName">{i18n.t.auth.register.displayNameLabel}</label>
			<input
				type="text"
				id="displayName"
				name="displayName"
				required
				autocomplete="name"
				value={form?.displayName ?? ""}
			/>
		</div>

		<div class="form-field">
			<label for="password">{i18n.t.auth.register.passwordLabel}</label>
			<input
				type="password"
				id="password"
				name="password"
				required
				minlength="8"
				autocomplete="new-password"
			/>
			<small>{i18n.t.auth.register.passwordHint}</small>
		</div>

		<button type="submit">{i18n.t.auth.register.submitButton}</button>
	</form>

	<div class="auth-switch">
		<p>
			<span>{i18n.t.auth.register.hasAccountPrompt}</span>
			<a href="/login">{i18n.t.auth.register.loginLink}</a>
		</p>
	</div>
</section>

<style>
	.auth-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
	}

	.form-field {
		display: flex;
		flex-direction: column;
	}

	.auth-switch {
		display: flex;
		align-items: center;
	}
</style>
