<script lang="ts">
	let { data } = $props();
</script>

<main>
	<h1>Werk</h1>
	<p>{data.message}</p>
	<p>Database: {data.database}</p>
</main>
