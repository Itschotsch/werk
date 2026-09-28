<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import { initI18n } from "$lib/i18n";
	import AppHeader from "$lib/components/layout/AppHeader.svelte";
	import AppFooter from "$lib/components/layout/AppFooter.svelte";

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();

	initI18n(() => data.locale);
</script>

<div class="app-layout">
	<AppHeader user={data.user} />
	<main>
		{@render children()}
	</main>
	<AppFooter />
</div>

<style>
	.app-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1 1 auto;
	}
</style>
