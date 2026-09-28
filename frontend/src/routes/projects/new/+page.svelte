<script lang="ts">
	import type { ActionData } from "./$types";
	import { useI18n } from "$lib/i18n";
	import { enhance } from "$app/forms";

	interface Props {
		form: ActionData;
	}

	interface FormFields {
		title?: string;
		description?: string;
		tagsStr?: string;
	}

	let { form }: Props = $props();
	const i18n = useI18n();
	let isSubmitting = $state(false);

	const formFields = $derived(form && "fields" in form ? (form.fields as FormFields) : undefined);
</script>

<svelte:head>
	<title>{i18n.t.projects.createTitle} | {i18n.t.pages.projects.title}</title>
</svelte:head>

<div>
	<header>
		<h1>{i18n.t.projects.createTitle}</h1>
		<p><a href="/projects">{i18n.t.projects.backToOverview}</a></p>
	</header>

	{#if form && "error" in form && form.error}
		<div role="alert">
			<p>{i18n.t.projects.createError}: {form.error}</p>
		</div>
	{/if}

	<main>
		<form
			method="post"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					await update();
					isSubmitting = false;
				};
			}}
		>
			<div>
				<label for="title">{i18n.t.projects.titleLabel}</label>
				<input
					type="text"
					id="title"
					name="title"
					required
					maxlength="300"
					placeholder={i18n.t.projects.titlePlaceholder}
					value={formFields?.title ?? ""}
				/>
			</div>

			<div>
				<label for="description">{i18n.t.projects.descriptionLabel}</label>
				<textarea
					id="description"
					name="description"
					rows="6"
					maxlength="20000"
					placeholder={i18n.t.projects.descriptionPlaceholder}
					>{formFields?.description ?? ""}</textarea
				>
			</div>

			<div>
				<label for="tags">{i18n.t.projects.tagsLabelComma}</label>
				<input
					type="text"
					id="tags"
					name="tags"
					placeholder={i18n.t.projects.tagsPlaceholder}
					value={formFields?.tagsStr ?? ""}
				/>
			</div>

			<div>
				<label>
					<input type="checkbox" name="isPublic" checked />
					{i18n.t.projects.isPublicLabel}
				</label>
			</div>

			<div>
				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? i18n.t.projects.submitting : i18n.t.projects.submitCreate}
				</button>
			</div>
		</form>
	</main>
</div>
