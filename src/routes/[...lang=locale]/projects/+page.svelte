<script>
	import GitHub from '$lib/assets/svg/GitHub.svelte';
	import LargeProjectCard from '$lib/components/LargeProjectCard.svelte';
	import LazyImage from '$lib/components/LazyImage.svelte';
	import { t } from '$lib/translations';
	export let data;
</script>

<svelte:head>
	<title>{$t('projects.projects')} - George Grainger</title>
</svelte:head>

<section>
	<h1>{$t('projects.projects')}</h1>

	<ul>
		{#each data.projects as project}
			<li>
				<LargeProjectCard href={project.slug} tags={project.tags}>
					<svelte:fragment slot="image">
						<LazyImage
							placeholderSrc={project.placeholderSrc || ''}
							src={project.src}
							alt={project.alt}
						/>
					</svelte:fragment>
					<svelte:fragment slot="title">{project.title}</svelte:fragment>
					<svelte:fragment slot="published">
						{#if project.github}
							<a href={project.github} target="_blank" rel="noopener noreferrer">
								<GitHub />{$t('projects.published')}
								{project.date}
							</a>
						{:else}
							{$t('projects.published')}
							{project.date}
						{/if}
					</svelte:fragment>
					<svelte:fragment slot="description">{project.description}</svelte:fragment>
				</LargeProjectCard>
			</li>
		{/each}
	</ul>
</section>

<style>
	h1 {
		margin: auto;
		margin-left: 1rem;
	}

	ul {
		display: grid;
		margin-top: 1em;
		gap: 2rem;
	}

	@media only screen and (max-width: 59.9375rem) {
		h1 {
			text-align: center;
		}
	}
</style>
