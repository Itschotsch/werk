<script lang="ts">
	import { useI18n } from "$lib/i18n";

	const i18n = useI18n();
</script>

<svelte:head>
	<title>{i18n.t.pageTitle(i18n.t.pages.about.title)}</title>
</svelte:head>

<div>
	<header>
		<h1>{i18n.t.pages.about.title}</h1>
		<p>{i18n.t.pages.about.subtitle}</p>
	</header>

	<main>
		<section>
			<h2>{i18n.t.pages.about.missionTitle}</h2>
			<p>{i18n.t.pages.about.missionText}</p>
		</section>

		<section>
			<h2>{i18n.t.pages.about.creativesTitle}</h2>
			<p>{i18n.t.pages.about.creativesText}</p>
		</section>

		<section>
			<h2>{i18n.t.pages.about.openTitle}</h2>
			<p>{i18n.t.pages.about.openText}</p>
		</section>
	</main>
</div>
