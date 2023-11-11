<script>
	import { browser } from '$app/environment';
	import { invalidate } from '$app/navigation';
	import { getContext } from 'svelte';

	const { t, locale } = getContext('translations');
	export let data;

	$: if (browser && $locale) {
		invalidate('projects:data');
	}
</script>

<pre>{JSON.stringify(data.projects)}</pre>

<h1>blog</h1>

<ul>
	<li><a href="/projects/one">one</a></li>
	<li><a href="/projects/two">two</a></li>
	<li><a href="/projects/three">three</a></li>
	<li>{$t('global.home')}</li>
</ul>
