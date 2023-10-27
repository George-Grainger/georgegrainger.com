<script lang="ts">
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
	import '@fontsource/poppins/800.css';
	import '../global.scss';
	import Footer from './Footer.svelte';
	import Nav from './Nav.svelte';
	import Symbols from '$lib/assets/svg/Symbols.svelte';
	import { blur, fly } from 'svelte/transition';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	let interval = 300;
	let showClouds = false;
	let navigated = false;
	let beenDuration = false;

	beforeNavigate(() => {
		showClouds = true;
		setTimeout(() => (beenDuration = true), 400);
	});

	afterNavigate(() => {
		navigated = true;
	});

	$: if (navigated && beenDuration) {
		showClouds = false;
		beenDuration = false;
		navigated = false;
	}
</script>

<Nav />

{#if !showClouds}
	<main transition:blur={{ duration: interval }}>
		<slot />
	</main>
{/if}

<Footer />
<Symbols />

{#if showClouds}
	<div transition:fly={{ x: '50%', duration: interval }} class="big-cloud" />
	<div transition:fly={{ x: '-50%', duration: interval }} class="big-cloud" />
{/if}

<style lang="scss">
	.big-cloud {
		z-index: 5;
		position: fixed;
		inset: 0;
		background-color: var(--cloud);
		translate: 40%;

		+ .big-cloud {
			// background-color: pink;
			translate: -40%;
		}
	}
</style>
