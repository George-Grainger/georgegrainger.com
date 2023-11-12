<script>
	import Button from '$lib/components/Button.svelte';
	import { t } from '$lib/translations';
</script>

<section class="error">
	<h1>{$t('error.title')}</h1>
	<h2>{$t(`error.projects`)}</h2>

	<p>{$t(`error.projects.body`)}</p>

	<Button href="/projects">{$t('error.return-projects')}</Button>
</section>
