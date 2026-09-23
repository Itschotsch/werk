<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import type { NavItem, UserSummary } from '$lib/types/navigation';

	interface Props {
		title?: string;
		navItems?: NavItem[];
		user?: UserSummary | null;
		searchSnippet?: Snippet;
		actionsSnippet?: Snippet;
		userSnippet?: Snippet<[UserSummary]>;
	}

	let {
		title = 'Werk',
		navItems = [
			{ label: 'Projekte', href: '/projects' },
			{ label: 'Kreative', href: '/creatives' },
			{ label: 'Entdecken', href: '/explore' }
		],
		user = null,
		searchSnippet,
		actionsSnippet,
		userSnippet
	}: Props = $props();

	function isActive(item: NavItem, currentPath: string): boolean {
		if (item.exact) {
			return currentPath === item.href;
		}
		return currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
	}
</script>

<header>
	<div class="header-group">
		<a href="/" aria-label="{title}-Startseite">
			<span>{title}</span>
		</a>

		<nav aria-label="Navigation">
			<ul>
				{#each navItems as item (item.href)}
					{@const active = isActive(item, page.url.pathname)}
					<li>
						<a href={item.href} aria-current={active ? 'page' : undefined}>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<div class="header-group">
		{#if searchSnippet}
			{@render searchSnippet()}
		{:else}
			<form action="/search" method="get" role="search" class="search-form">
				<input
					id="global-search"
					name="q"
					type="search"
					aria-label="Suche Projekte, Kreative, ..."
					placeholder="Suche..."
					autocomplete="off"
				/>
				<button type="submit">Suchen</button>
			</form>
		{/if}

		<div class="actions-group">
			{#if actionsSnippet}
				{@render actionsSnippet()}
			{/if}

			{#if user}
				{#if userSnippet}
					{@render userSnippet(user)}
				{:else}
					<a href="/profile" aria-label="User Profile">
						<span>{user.displayName}</span>
					</a>
				{/if}
			{:else}
				<a href="/login">Anmelden</a>
			{/if}
		</div>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-group {
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

	.search-form {
		display: flex;
		align-items: center;
	}

	.actions-group {
		display: flex;
		align-items: center;
	}
</style>
