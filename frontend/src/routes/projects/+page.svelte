<script lang="ts">
	import type { PageData } from "./$types";
	import { useI18n } from "$lib/i18n";

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const i18n = useI18n();
</script>

<svelte:head>
	<title>{i18n.t.pages.projects.title} | Werk</title>
</svelte:head>

<div>
	<header>
		<h1>{i18n.t.pages.projects.title}</h1>
		<p>
			<a href="/projects/new">{i18n.t.projects.createNew}</a>
		</p>
	</header>

	<section>
		<form method="get" action="/projects">
			<input
				type="search"
				name="search"
				placeholder={i18n.t.projects.searchPlaceholder}
				value={data.filters.search || ""}
			/>
			<button type="submit">{i18n.t.projects.searchButton}</button>
		</form>
	</section>

	<main>
		{#if data.projects && data.projects.length > 0}
			<ul>
				{#each data.projects as project (project.id)}
					<li>
						<article>
							<h2>
								<a href="/projects/{project.id}">{project.title}</a>
							</h2>
							{#if project.description}
								<p>{project.description.slice(0, 200)}...</p>
							{/if}
							{#if project.tags && project.tags.length > 0}
								<p>
									<small>{i18n.t.projects.tagsLabel}: {project.tags.join(", ")}</small>
								</p>
							{/if}
							{#if project.leaders && project.leaders.length > 0}
								<p>
									<small>
										{i18n.t.projects.leadershipLabel}: {project.leaders
											.map((l) => l.displayName || l.username)
											.join(", ")}
									</small>
								</p>
							{/if}
						</article>
					</li>
				{/each}
			</ul>
		{:else}
			<p>{i18n.t.projects.noProjectsFound}</p>
		{/if}
	</main>
</div>
