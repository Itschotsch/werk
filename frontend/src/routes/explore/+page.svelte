<script lang="ts">
	import { useI18n } from '$lib/i18n';

	const i18n = useI18n();
</script>

<svelte:head>
	<title>{i18n.t.pages.explore.title} | Werk</title>
</svelte:head>

<div>
	<h1>{i18n.t.pages.explore.title}</h1>
	<p>{i18n.t.pages.explore.placeholderText}</p>
</div>
