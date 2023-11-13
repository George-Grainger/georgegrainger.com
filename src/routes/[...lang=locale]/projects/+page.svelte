<script>
	import LargeProjectCard from '$lib/components/LargeProjectCard.svelte';
	import LazyImage from '$lib/components/LazyImage.svelte';
	import { locale, t } from '$lib/translations';
	export let data;
</script>

<svelte:head>
	<title>{$t('projects.projects')} - George Grainger</title>
</svelte:head>

<h1>{$t('projects.projects')}</h1>

<ul>
	{#each data.projects as project}
		<li>
			<LargeProjectCard href={project.slug} technologies={project.technologies}>
				<svelte:fragment slot="image">
					<LazyImage
						placeholderSrc={project.placeholderSrc || ''}
						src={project.src}
						alt={project.alt}
					/>
				</svelte:fragment>
				<svelte:fragment slot="title">{project.title}</svelte:fragment>
				<svelte:fragment slot="published">Published {project.date}</svelte:fragment>
				<svelte:fragment slot="description">{project.description}</svelte:fragment>
			</LargeProjectCard>
		</li>
	{/each}
</ul>

<style>
	h1 {
		font-size: 4rem;
		font-weight: 700;
		margin: auto;
		margin-bottom: 2rem;
	}

	ul {
		display: grid;
		gap: 2rem;
	}
</style>
