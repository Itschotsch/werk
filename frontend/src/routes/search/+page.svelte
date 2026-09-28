<script lang="ts">
	import { page } from "$app/state";
	import { useI18n } from "$lib/i18n";

	const i18n = useI18n();
	const query = $derived(page.url.searchParams.get("q") || "");
</script>

<svelte:head>
	<title>{i18n.t.pageTitle(i18n.t.pages.search.title)}</title>
</svelte:head>

<div>
	<h1>{i18n.t.pages.search.title}</h1>
	{#if query}
		<p>{i18n.t.pages.search.resultsFor(query)}</p>
	{:else}
		<p>{i18n.t.pages.search.placeholderText}</p>
	{/if}
</div>
