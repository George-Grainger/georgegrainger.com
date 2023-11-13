<script>
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
			<h2>
				<a href={`/${$locale}${project.slug}+1`}>
					{project.title}
				</a>
			</h2>
			Published {project.date}
		</li>
	{/each}
</ul>
