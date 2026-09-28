<script lang="ts">
	import type { ActionData } from "./$types";
	import { useI18n } from "$lib/i18n";

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();

	const i18n = useI18n();
</script>

<svelte:head>
	<title>{i18n.t.pageTitle(i18n.t.auth.login.title)}</title>
</svelte:head>

<section class="auth-container">
	<h1>{i18n.t.auth.login.title}</h1>

	{#if form?.error}
		<div role="alert" class="alert">
			<p>{i18n.t.auth.login.invalidCredentials}</p>
		</div>
	{/if}

	<form method="POST" class="auth-form">
		<div class="form-field">
			<label for="identifier">{i18n.t.auth.login.identifierLabel}</label>
			<input
				type="text"
				id="identifier"
				name="identifier"
				required
				autocomplete="username"
				placeholder={i18n.t.auth.login.identifierPlaceholder}
				value={form?.identifier ?? ""}
			/>
		</div>

		<div class="form-field">
			<label for="password">{i18n.t.auth.login.passwordLabel}</label>
			<input
				type="password"
				id="password"
				name="password"
				required
				autocomplete="current-password"
			/>
		</div>

		<button type="submit">{i18n.t.auth.login.submitButton}</button>
	</form>

	<div class="auth-switch">
		<p>
			<span>{i18n.t.auth.login.noAccountPrompt}</span>
			<a href="/register">{i18n.t.auth.login.registerLink}</a>
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
