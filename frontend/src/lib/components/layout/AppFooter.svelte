<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { NavItem } from '$lib/types/navigation';

	interface Props {
		tagline?: string;
		navItems?: NavItem[];
		extraSnippet?: Snippet;
	}

	let {
		tagline = 'Plattform für Kreativschaffende',
		navItems = [
			{ label: 'Impressum', href: '/about' },
			{ label: 'Richtlinien', href: '/guidelines' },
			{ label: 'Entdecken', href: '/explore' },
			{ label: 'Anmelden', href: '/login' }
		],
		extraSnippet
	}: Props = $props();

	const currentYear = new Date().getFullYear();
</script>

<footer>
	<div class="footer-section">
		<p>
			<strong>Werk</strong>
			<span>–</span>
			<span>{tagline}</span>
		</p>
	</div>

	<nav aria-label="Footer Navigation">
		<ul>
			{#each navItems as item (item.href)}
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
			<small>© {currentYear} Werk</small>
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
