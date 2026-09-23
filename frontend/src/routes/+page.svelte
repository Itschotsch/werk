<script lang="ts">
	import { useI18n } from '$lib/i18n';

	let { data } = $props();

	const i18n = useI18n();
</script>

<section>
	<h1>Werk</h1>
	{#if data.user}
		<p>{i18n.t.auth.register.welcomeMessage(data.user.displayName)}</p>
	{/if}
	<p>{data.message}</p>
	<p>{i18n.t.home.databaseStatus(data.database)}</p>
</section>
