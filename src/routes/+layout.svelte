<script lang="ts">
	import '@fontsource/poppins';
	import '../global.scss';
	import Footer from './Footer.svelte';
	import Nav from './Nav.svelte';
	import Symbols from '$lib/svg/Symbols.svelte';
	import type { LayoutServerData } from './$types';
	import { blur, fly } from 'svelte/transition';

	export let data: LayoutServerData;

	let interval = 350;
	let showClouds = false;
</script>

<Nav />

{#if showClouds}
	<div transition:fly={{ x: '50%', duration: interval }} class="test" />
	<div transition:fly={{ x: '-50%', duration: interval }} class="test" />
{/if}

<main>
	{#key data.pathname}
		<div
			in:blur={{ duration: interval / 2, delay: interval }}
			out:blur={{ duration: interval }}
			on:outrostart={() => (showClouds = true)}
			on:introend={() => (showClouds = false)}
		>
			<slot />
		</div>
	{/key}
</main>

<Footer />
<Symbols />

<style lang="scss">
	.test {
		z-index: 5;
		opacity: 0.8;
		position: absolute;
		inset: 0;
		background-color: grey;
		translate: 40%;

		+ .test {
			background-color: pink;
			translate: -40%;
		}
	}
</style>
