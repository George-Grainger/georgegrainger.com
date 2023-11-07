<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { getContext } from 'svelte';

	const { t } = getContext('translations');
	const { status } = $page;
</script>

<section>
	<h1>{$t('error.title')}</h1>
	<h2>{$t(`error.${status}`)}</h2>

	<p>{$t(`error.${status}.body`)}</p>

	<Button href="/">{$t('error.return')}</Button>
</section>

<style lang="scss">
	section {
		display: grid;
		place-items: center;
		place-content: center;
		min-height: 50vh;
		min-height: 50svh;
	}

	h1 {
		line-height: 1;
		font-weight: 800;
		font-size: 5em;
		letter-spacing: -0.03rem;
	}

	h2 {
		font-weight: 700;
		font-size: 1.6em;
		letter-spacing: -0.015rem;
	}

	p {
		text-align: center;
		font-size: 0.9em;
		max-width: 36ch;
		text-wrap: balance;
		margin-block: 0.75em 1.5em;
	}
</style>
