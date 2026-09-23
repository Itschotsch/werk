<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { NavItem } from '$lib/types/navigation';
	import { useI18n } from '$lib/i18n';

	interface Props {
		tagline?: string;
		navItems?: NavItem[];
		extraSnippet?: Snippet;
	}

	let { tagline, navItems, extraSnippet }: Props = $props();

	const i18n = useI18n();

	const resolvedTagline = $derived(tagline ?? i18n.t.footer.tagline);

	const resolvedNavItems = $derived(
		navItems ?? [
			{ label: i18n.t.footer.nav.about, href: '/about' },
			{ label: i18n.t.footer.nav.guidelines, href: '/guidelines' },
			{ label: i18n.t.footer.nav.explore, href: '/explore' },
			{ label: i18n.t.footer.nav.imprint, href: '/imprint' }
		]
	);

	const currentYear = new Date().getFullYear();
</script>

<footer>
	<div class="footer-section">
		<p>
			<strong>Werk</strong>
			<span>–</span>
			<span>{resolvedTagline}</span>
		</p>
	</div>

	<nav aria-label={i18n.t.footer.navAriaLabel}>
		<ul>
			{#each resolvedNavItems as item (item.href)}
				<li>
					<a href={item.href}>{item.label}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="footer-section">
		{#if extraSnippet}
			{@render extraSnippet()}
		{:else}
			<small>{i18n.t.footer.copyright(currentYear)}</small>
		{/if}
	</div>
</footer>

<style>
	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}

	.footer-section {
		display: flex;
		align-items: center;
	}

	nav {
		display: flex;
		align-items: center;
	}

	nav ul {
		display: flex;
		list-style: none;
	}
</style>
