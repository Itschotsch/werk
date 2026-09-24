<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import type { UserLocation } from '$lib/types/profile';
	import { useI18n } from '$lib/i18n';
	import { enhance } from '$app/forms';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	interface FormFields {
		displayName?: string;
		biography?: string;
		locationsStr?: string;
		rolesStr?: string;
		website?: string;
	}

	let { data, form }: Props = $props();

	const i18n = useI18n();

	let isEditing = $state(false);
	let isSubmitting = $state(false);

	const formFields = $derived(form && 'fields' in form ? (form.fields as FormFields) : undefined);

	const profile = $derived(form && 'user' in form && form.user ? form.user : data.profile);

	const formattedDate = $derived.by(() => {
		if (!profile.createdAt) return '';
		try {
			const date = new Date(profile.createdAt);
			return new Intl.DateTimeFormat(i18n.locale, {
				year: 'numeric',
				month: 'long'
			}).format(date);
		} catch {
			return profile.createdAt;
		}
	});

	const locationsInput = $derived(
		profile.locations ? profile.locations.map((l: UserLocation) => l.name).join('\n') : ''
	);

	const rolesInput = $derived(profile.roles ? profile.roles.join(', ') : '');

	function toggleEdit() {
		isEditing = !isEditing;
	}
</script>

<svelte:head>
	<title>{i18n.t.profile.title(profile.displayName)} | Werk</title>
</svelte:head>

<div>
	<header>
		<div>
			{#if profile.avatarUrl}
				<img src={profile.avatarUrl} alt={profile.displayName} />
			{/if}
			<h1>{profile.displayName}</h1>
			<p>@{profile.username}</p>
		</div>

		{#if formattedDate}
			<p>{i18n.t.profile.memberSince(formattedDate)}</p>
		{/if}

		{#if profile.isOwner}
			<div>
				<button type="button" onclick={toggleEdit}>
					{isEditing ? i18n.t.profile.closeEdit : i18n.t.profile.editProfile}
				</button>
			</div>
		{/if}
	</header>

	{#if form && 'success' in form && form.success}
		<div role="status">
			<p>{i18n.t.profile.successMessage}</p>
		</div>
	{:else if form && 'error' in form && form.error}
		<div role="alert">
			<p>{i18n.t.profile.errorMessage}</p>
		</div>
	{/if}

	{#if isEditing && profile.isOwner}
		<section>
			<h2>{i18n.t.profile.editModalTitle}</h2>
			<form
				method="post"
				action="?/updateProfile"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ update, result }) => {
						await update();
						isSubmitting = false;
						if (result.type === 'success') {
							isEditing = false;
						}
					};
				}}
			>
				<div>
					<label for="displayName">{i18n.t.profile.displayNameLabel}</label>
					<input
						type="text"
						id="displayName"
						name="displayName"
						value={formFields?.displayName ?? profile.displayName}
						required
						maxlength="50"
					/>
				</div>

				<div>
					<label for="biography">{i18n.t.profile.biographyLabel}</label>
					<textarea
						id="biography"
						name="biography"
						rows="5"
						maxlength="5000"
						placeholder={i18n.t.profile.biographyPlaceholder}
						>{formFields?.biography ?? profile.biography}</textarea
					>
				</div>

				<div>
					<label for="locations">{i18n.t.profile.locationsLabel}</label>
					<textarea
						id="locations"
						name="locations"
						rows="3"
						placeholder={i18n.t.profile.locationsPlaceholder}
						>{formFields?.locationsStr ?? locationsInput}</textarea
					>
					<p><small>{i18n.t.profile.locationsHint}</small></p>
				</div>

				<div>
					<label for="roles">{i18n.t.profile.rolesLabel}</label>
					<input
						type="text"
						id="roles"
						name="roles"
						value={formFields?.rolesStr ?? rolesInput}
						placeholder={i18n.t.profile.rolesPlaceholder}
					/>
					<p><small>{i18n.t.profile.rolesHint}</small></p>
				</div>

				<div>
					<label for="website">{i18n.t.profile.websiteLabel}</label>
					<input
						type="url"
						id="website"
						name="website"
						value={formFields?.website ?? profile.website}
						maxlength="200"
						placeholder={i18n.t.profile.websitePlaceholder}
					/>
				</div>

				<div>
					<button type="button" onclick={toggleEdit}>
						{i18n.t.profile.closeEdit}
					</button>
					<button type="submit" disabled={isSubmitting}>
						{isSubmitting ? i18n.t.profile.saving : i18n.t.profile.saveChanges}
					</button>
				</div>
			</form>
		</section>
	{/if}

	<main>
		<section>
			<h2>{i18n.t.profile.biographyTitle}</h2>
			{#if profile.biography}
				<p>{profile.biography}</p>
			{:else}
				<p>{i18n.t.profile.noBiography}</p>
			{/if}
		</section>

		<section>
			<h2>{i18n.t.profile.locationsTitle}</h2>
			{#if profile.locations && profile.locations.length > 0}
				<ul>
					{#each profile.locations as location (location.name)}
						<li>{location.name}</li>
					{/each}
				</ul>
			{:else}
				<p>{i18n.t.profile.noLocations}</p>
			{/if}
		</section>

		<section>
			<h2>{i18n.t.profile.rolesTitle}</h2>
			{#if profile.roles && profile.roles.length > 0}
				<ul>
					{#each profile.roles as role (role)}
						<li>{role}</li>
					{/each}
				</ul>
			{:else}
				<p>{i18n.t.profile.noRoles}</p>
			{/if}
		</section>

		{#if profile.website}
			<section>
				<h2>{i18n.t.profile.websiteTitle}</h2>
				<p>
					<a href={profile.website} target="_blank" rel="noopener noreferrer">
						{profile.website}
					</a>
				</p>
			</section>
		{/if}
	</main>
</div>
