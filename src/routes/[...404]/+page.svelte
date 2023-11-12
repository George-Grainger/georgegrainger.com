<script>
	import Button from '$lib/components/Button.svelte';
	import { t } from '$lib/translations';
</script>

<section class="error">
	<h1>{$t('error.title')}</h1>
	<h2>{$t(`error.404`)}</h2>

	<p>{$t(`error.404.body`)}</p>

	<Button href="/">{$t('error.return')}</Button>
</section>
