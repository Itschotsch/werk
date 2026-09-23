<script lang="ts">
	import AppHeader from '$lib/components/layout/AppHeader.svelte';
	import AppFooter from '$lib/components/layout/AppFooter.svelte';

	let { children } = $props();
</script>

<div class="app-layout">
	<AppHeader />
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
