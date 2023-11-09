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
	if (browser) {
		const oneYear = 1000 * 60 * 60 * 24 * 365;
		locale.subscribe(($locale) => {
			document.cookie = `lang=${$locale} ; expires=${oneYear} ; path = /; SameSite=strict ;`;
			document.documentElement.setAttribute('lang', $locale);
		});
	}

	// Page transitions
	let duration = 450;
	let showClouds = false;
	let beenDuration = true;

	beforeNavigate((e) => {
		const changed = !e.willUnload && e.from?.route.id != e.to?.route.id;
		showClouds = changed;
		beenDuration = !changed;
		setTimeout(() => (beenDuration = true), 600);
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
	<main out:fade={{ duration: duration }}>
		<slot />
	</main>
	<Footer {duration} />
{:else}
	<svg width="110vw" height="54vw" overflow="visible">
		<use
			href="#lg-cloud-1"
			class="big-cloud"
			x="-5vw"
			y="-18vw"
			transition:fly={{ x: '-110vw', duration: duration }}
		/>
		<use
			href="#lg-cloud-1"
			x="-5vw"
			y="10vw"
			class="big-cloud"
			transition:fly={{ x: '110vw', duration: duration }}
		/>
	</svg>
{/if}

<Symbols />

<style lang="scss">
	svg {
		z-index: 9;
		position: fixed;
		pointer-events: none;
	}
</style>
