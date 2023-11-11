<script>
	import { getContext } from 'svelte';

	const { t } = getContext('translations');
	export let data;
</script>

<pre>{JSON.stringify(data.projects)}</pre>

<h1>blog</h1>

<ul>
	<li><a href="/projects/one">one</a></li>
	<li><a href="/projects/two">two</a></li>
	<li><a href="/projects/three">three</a></li>
	<li>{$t('global.home')}</li>
</ul>
