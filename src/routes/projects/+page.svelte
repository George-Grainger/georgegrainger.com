<script>
	import { getContext } from 'svelte';

	const { t } = getContext('translations');
	export let data;
</script>

<h1>Projects</h1>

<ul>
	{#each data.projects as project}
		<li>
			<h2>
				<a href={project.slug}>
					{project.title}
				</a>
			</h2>
			Published {project.date}
		</li>
	{/each}
</ul>
