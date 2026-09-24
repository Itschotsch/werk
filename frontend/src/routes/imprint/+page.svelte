<script lang="ts">
	import { useI18n } from '$lib/i18n';

	const i18n = useI18n();
</script>

<svelte:head>
	<title>{i18n.t.pages.imprint.title} | Werk</title>
</svelte:head>

<div>
	<header>
		<h1>{i18n.t.pages.imprint.title}</h1>
	</header>

	<main>
		<section>
			<h2>{i18n.t.pages.imprint.contactTitle}</h2>
			<ul>
				<li>{i18n.t.pages.imprint.emailLabel}: kontakt@werk.ch</li>
				<li>{i18n.t.pages.imprint.websiteLabel}: https://werk.ch</li>
			</ul>
		</section>
	</main>
</div>
