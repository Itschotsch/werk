<script lang="ts">
	import type { PageData, ActionData } from "./$types";
	import { useI18n } from "$lib/i18n";
	import { enhance } from "$app/forms";

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();
	const i18n = useI18n();

	const project = $derived(data.project);
</script>

<svelte:head>
	<title>{i18n.t.pageTitle(`${project.title} | ${i18n.t.pages.projects.title}`)}</title>
</svelte:head>

<div>
	<header>
		<p><a href="/projects">{i18n.t.projects.allProjects}</a></p>
		<h1>{project.title}</h1>
		{#if project.statusHistory && project.statusHistory.length > 0 && project.statusHistory[0]}
			{@const currentStatus = project.statusHistory[0].status}
			<p>
				<strong>{i18n.t.projects.statusLabel}:</strong>
				{i18n.t.projectStatus[currentStatus] || currentStatus}
			</p>
		{/if}
	</header>

	{#if form?.error}
		<div role="alert">
			<p>{i18n.t.projects.actionFailed}: {form.error}</p>
		</div>
	{/if}

	<main>
		<section>
			<h2>{i18n.t.projects.description}</h2>
			{#if project.description}
				<p>{project.description}</p>
			{:else}
				<p>{i18n.t.projects.noDescription}</p>
			{/if}
		</section>

		{#if project.tags && project.tags.length > 0}
			<section>
				<h2>{i18n.t.projects.tags}</h2>
				<ul>
					{#each project.tags as tag (tag)}
						<li>#{tag}</li>
					{/each}
				</ul>
			</section>
		{/if}

		<section>
			<h2>{i18n.t.projects.leadership}</h2>
			<ul>
				{#each project.leaders as leader (leader.id)}
					<li>
						<a href="/user/{leader.username}">{leader.displayName || leader.username}</a>
						<small>(@{leader.username})</small>
					</li>
				{/each}
			</ul>
		</section>

		<section>
			<h2>
				{i18n.t.projects.participantsAndCredits} ({project.participants
					? project.participants.length
					: 0})
			</h2>
			{#if project.participants && project.participants.length > 0}
				<ul>
					{#each project.participants as p (p._id || p.role)}
						<li>
							{#if p.user}
								<a href="/user/{p.user.username}">{p.user.displayName || p.user.username}</a>
							{:else}
								<span>{p.name || i18n.t.projects.unknown}</span>
							{/if}
							<span>– <strong>{p.role}</strong></span>
							{#if p.status === "pending"}
								<small> ({i18n.t.projects.pendingTag})</small>
							{/if}
							{#if p.contributionNote}
								<p><small>{p.contributionNote}</small></p>
							{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<p>{i18n.t.projects.noParticipants}</p>
			{/if}

			{#if project.isLeader}
				<article>
					<h3>{i18n.t.projects.addParticipant}</h3>
					<form method="post" action="?/addParticipant" use:enhance>
						<div>
							<label for="usernameOrEmail">{i18n.t.projects.userLabel}</label>
							<input
								type="text"
								id="usernameOrEmail"
								name="usernameOrEmail"
								placeholder={i18n.t.projects.userPlaceholder}
							/>
						</div>
						<div>
							<label for="name">{i18n.t.projects.freeTextNameLabel}</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder={i18n.t.projects.freeTextNamePlaceholder}
							/>
						</div>
						<div>
							<label for="role">{i18n.t.projects.roleLabel}</label>
							<input
								type="text"
								id="role"
								name="role"
								required
								placeholder={i18n.t.projects.rolePlaceholder}
							/>
						</div>
						<button type="submit">{i18n.t.projects.addParticipant}</button>
					</form>
				</article>
			{/if}
		</section>

		<section>
			<h2>{i18n.t.projects.logbookTitle} ({project.logEntries ? project.logEntries.length : 0})</h2>
			{#if project.logEntries && project.logEntries.length > 0}
				<ul>
					{#each project.logEntries as log (log._id || log.title)}
						<li>
							<article>
								<h3>{log.title}</h3>
								{#if log.location?.name}
									<p><small>{i18n.t.projects.locationLabel}: {log.location.name}</small></p>
								{/if}
								<p>{log.text}</p>
								{#if log.author}
									<p>
										<small
											>{i18n.t.projects.authoredBy}:
											<a href="/user/{log.author.username}">
												{log.author.displayName || log.author.username}
											</a>
										</small>
									</p>
								{/if}
							</article>
						</li>
					{/each}
				</ul>
			{:else}
				<p>{i18n.t.projects.noLogEntries}</p>
			{/if}

			{#if project.isLeader}
				<article>
					<h3>{i18n.t.projects.writeLogEntry}</h3>
					<form method="post" action="?/addLogEntry" use:enhance>
						<div>
							<label for="logTitle">{i18n.t.projects.logTitleLabel}</label>
							<input
								type="text"
								id="logTitle"
								name="title"
								required
								placeholder={i18n.t.projects.logTitlePlaceholder}
							/>
						</div>
						<div>
							<label for="locationName">{i18n.t.projects.logLocationLabel}</label>
							<input
								type="text"
								id="locationName"
								name="locationName"
								placeholder={i18n.t.projects.logLocationPlaceholder}
							/>
						</div>
						<div>
							<label for="logDatetime">{i18n.t.projects.logDatetimeLabel}</label>
							<input type="datetime-local" id="logDatetime" name="datetime" />
						</div>
						<div>
							<label for="logText">{i18n.t.projects.logTextLabel}</label>
							<textarea
								id="logText"
								name="text"
								rows="5"
								required
								placeholder={i18n.t.projects.logTextPlaceholder}
							></textarea>
						</div>
						<button type="submit">{i18n.t.projects.publishLogEntry}</button>
					</form>
				</article>
			{/if}
		</section>
	</main>
</div>
