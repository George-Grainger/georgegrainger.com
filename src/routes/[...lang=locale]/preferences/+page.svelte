<script>
	import { t } from '$lib/translations';
</script>

<svelte:head>
	<title>{$t('preferences.preferences')} - George Grainger</title>
</svelte:head>

<section class="prose">
	<h1>{$t('preferences.preferences')}</h1>
	{#each $t('preferences.paragraphs') as paragraph}
		<p>{@html paragraph}</p>
	{/each}
</section>
