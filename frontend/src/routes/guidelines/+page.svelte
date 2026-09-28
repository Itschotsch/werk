<script lang="ts">
	import { useI18n } from "$lib/i18n";

	const i18n = useI18n();
</script>

<svelte:head>
	<title>{i18n.t.pageTitle(i18n.t.pages.guidelines.title)}</title>
</svelte:head>

<div>
	<header>
		<h1>{i18n.t.pages.guidelines.title}</h1>
		<p>{i18n.t.pages.guidelines.subtitle}</p>
	</header>

	<main>
		<section>
			<h2>{i18n.t.pages.guidelines.respectTitle}</h2>
			<p>{i18n.t.pages.guidelines.respectText}</p>
		</section>

		<section>
			<h2>{i18n.t.pages.guidelines.copyrightTitle}</h2>
			<p>{i18n.t.pages.guidelines.copyrightText}</p>
		</section>

		<section>
			<h2>{i18n.t.pages.guidelines.authenticityTitle}</h2>
			<p>{i18n.t.pages.guidelines.authenticityText}</p>
		</section>

		<section>
			<h2>{i18n.t.pages.guidelines.standardsTitle}</h2>
			<p>{i18n.t.pages.guidelines.standardsText}</p>
		</section>

		<section>
			<h2>{i18n.t.pages.guidelines.enforcementTitle}</h2>
			<p>{i18n.t.pages.guidelines.enforcementText}</p>
		</section>
	</main>
</div>
