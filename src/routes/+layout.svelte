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
	import { motion } from '$lib/stores/motion';
	import { t } from '$lib/translations';

	// Page transitions
	let duration = 350;
	let showClouds = false;
	let beenDuration = true;

	beforeNavigate((e) => {
		// Don't delay when navigating on mobile
		if (!showClouds && $motion == motion.NO_PREFERENCE) {
			const changed = !e.willUnload && e.from?.route.id != e.to?.route.id;
			showClouds = changed;
			beenDuration = !changed;
			setTimeout(() => (beenDuration = true), duration / 0.75);
		}
	});

	afterNavigate(() => {
		showClouds = false;
	});
</script>

<svelte:head>
	<title>{$t('global.title')}</title>
</svelte:head>

<Nav bind:showClouds />

{#if !showClouds && beenDuration}
	<main transition:fade={{ duration: duration }}>
		<slot />
	</main>
	<Footer {duration} />
{:else}
	<svg overflow="visible">
		<use href="#lg-cloud-1" transition:fly={{ x: '-100%', duration: duration }} />
		<use href="#lg-cloud-1" transition:fly={{ x: '100%', duration: duration }} />
	</svg>
{/if}

<Symbols />

<style lang="scss">
	svg {
		z-index: 9;
		position: fixed;
		pointer-events: none;
		width: 165vh;
		height: 81vh;
	}

	use:first-child {
		transform: translate(-25vh, -20vh);
	}

	use {
		transform: translate(-25vh, 25vh);
		opacity: 0.85;
	}

	@media only screen and (width > 60rem) {
		svg {
			width: 110vw;
			height: 54vw;
		}

		use:first-child {
			transform: translate(-5vw, -18vw);
		}

		use {
			transform: translate(-5vw, 15vh);
		}
	}
</style>
