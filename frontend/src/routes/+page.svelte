<script lang="ts">
	import { highlight } from "@highlighters/svelte";
	import { useI18n } from "$lib/i18n";

	let { data } = $props();

	const i18n = useI18n();
</script>

<svelte:head>
	<title>{i18n.t.pageTitle()}</title>
</svelte:head>

<section>
	<h1 use:highlight={{ color: "var(--primary-color)" }}>{i18n.t.appName}</h1>
	{#if data.user}
		<p>{i18n.t.auth.register.welcomeMessage(data.user.displayName)}</p>
	{/if}
	<p>{data.message}</p>
	<p>{i18n.t.home.databaseStatus(data.database)}</p>
</section>
