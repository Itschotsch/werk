<script lang="ts">
	import type { Snippet } from "svelte";
	import { page } from "$app/state";
	import type { NavItem, UserSummary } from "$lib/types/navigation";
	import { useI18n } from "$lib/i18n";

	interface Props {
		title?: string;
		navItems?: NavItem[];
		user?: UserSummary | null;
		searchSnippet?: Snippet;
		actionsSnippet?: Snippet;
		userSnippet?: Snippet<[UserSummary]>;
	}

	let {
		title = "Werk",
		navItems,
		user = null,
		searchSnippet,
		actionsSnippet,
		userSnippet
	}: Props = $props();

	const i18n = useI18n();

	const resolvedNavItems = $derived(
		navItems ?? [
			{ label: i18n.t.header.nav.projects, href: "/projects" },
			{ label: i18n.t.header.nav.creatives, href: "/creatives" },
			{ label: i18n.t.header.nav.explore, href: "/explore" }
		]
	);

	function isActive(item: NavItem, currentPath: string): boolean {
		if (item.exact) {
			return currentPath === item.href;
		}
		return currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href));
	}
</script>

<header>
	<div class="header-group">
		<a href="/" aria-label={i18n.t.header.homeAriaLabel(title)}>
			<span>{title}</span>
		</a>

		<nav aria-label={i18n.t.header.navAriaLabel}>
			<ul>
				{#each resolvedNavItems as item (item.href)}
					{@const active = isActive(item, page.url.pathname)}
					<li>
						<a href={item.href} aria-current={active ? "page" : undefined}>
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
					aria-label={i18n.t.header.search.inputAriaLabel}
					placeholder={i18n.t.header.search.placeholder}
					autocomplete="off"
				/>
				<button type="submit">{i18n.t.header.search.submit}</button>
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
					<a
						href={`/user/${user.username || user.handle || user.displayName}`}
						aria-label={i18n.t.header.user.profileAriaLabel}
					>
						<span>{user.displayName}</span>
					</a>
					<form action="/logout" method="post" class="logout-form">
						<button type="submit">{i18n.t.header.user.signOut}</button>
					</form>
				{/if}
			{:else}
				<a href="/login">{i18n.t.header.user.signIn}</a>
				<a href="/register">{i18n.t.header.user.register}</a>
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

	.logout-form {
		display: inline-flex;
		align-items: center;
	}
</style>
