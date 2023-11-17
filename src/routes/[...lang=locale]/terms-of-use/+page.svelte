<script>
	import { t } from '$lib/translations';
</script>

<svelte:head>
	<title>{$t('terms-of-use.terms-of-use')} - George Grainger</title>
</svelte:head>

<section class="prose">
	<h1>{$t('terms-of-use.terms-of-use')}</h1>
	{#each $t('terms-of-use.paragraphs') as paragraph}
		<p>{@html paragraph}</p>
	{/each}
</section>
