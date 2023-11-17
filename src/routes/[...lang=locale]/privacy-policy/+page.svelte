<script>
	import { t } from '$lib/translations';
</script>

<svelte:head>
	<title>{$t('privacy-policy.privacy-policy')} - George Grainger</title>
</svelte:head>

<section class="prose">
	<h1>{$t('privacy-policy.privacy-policy')}</h1>
	{#each $t('privacy-policy.paragraphs') as paragraph}
		<p>{@html paragraph}</p>
	{/each}
</section>
