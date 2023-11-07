<script lang="ts">
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
	import '@fontsource/poppins/800.css';
	import '../global.scss';
	import Footer from './Footer.svelte';
	import Nav from './Nav.svelte';
	import Symbols from '$lib/assets/svg/Symbols.svelte';
	import { fade, fly } from 'svelte/transition';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { setContext } from 'svelte';
	import { browser } from '$app/environment';

	// Handle Translations
	export let data;
	const { t, locale } = data;
	setContext('translations', { ...data });

	// Update cookie when locale changes
	const oneYear = 1000 * 60 * 60 * 24 * 365;
	browser &&
		locale.subscribe(
			($locale) => (document.cookie = `lang=${$locale} ; expires=${oneYear} ; path = /;`)
		);

	// Page transitions
	let interval = 300;
	let showClouds = false;
	let beenDuration = true;

	beforeNavigate((e) => {
		const changed = !e.willUnload && e.from?.route.id != e.to?.route.id;
		showClouds = changed;
		beenDuration = !changed;
		setTimeout(() => (beenDuration = true), 400);
	});

	afterNavigate(() => {
		showClouds = false;
	});
</script>

<svelte:head>
	<title>{$t('global.title')}</title>
</svelte:head>

<Nav />

{#if !showClouds && beenDuration}
	<main out:fade={{ duration: interval }}>
		<slot />
	</main>
{:else}
	<div transition:fly={{ x: '50%', duration: interval }} class="big-cloud" />
	<div transition:fly={{ x: '-50%', duration: interval }} class="big-cloud" />
{/if}

<Footer />
<Symbols />

<style lang="scss">
	.big-cloud {
		z-index: 5;
		position: fixed;
		inset: 0;
		background-color: var(--cloud);
		translate: 40%;

		+ .big-cloud {
			translate: -40%;
		}
	}
</style>
