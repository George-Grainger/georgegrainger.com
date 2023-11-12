<script>
	import { t } from '$lib/translations';
	export let data;
</script>

<h1>{$t('projects.projects')}</h1>

<ul>
	{#each data.projects as project}
		<li>
			<h2>
				<a href={project.slug + '-x'}>
					{project.title}
				</a>
			</h2>
			Published {project.date}
		</li>
	{/each}
</ul>
