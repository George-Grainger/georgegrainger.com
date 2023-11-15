<script lang="ts">
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
	import '@fontsource/poppins/800.css';
	import '../global.scss';
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Symbols from '$lib/assets/svg/Symbols.svelte';
	import { fade, fly } from 'svelte/transition';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { motion } from '$lib/stores/motion';
	// Page transitions
	$: duration = $motion === motion.NO_PREFERENCE ? 400 : 0;
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

<Nav bind:showClouds />

{#if !showClouds && beenDuration}
	<main transition:fade={{ duration: duration }}>
		<slot />
	</main>
	<Footer {duration} />
{:else}
	<svg overflow="visible">
		<g class="light">
			<use href="#lg-cloud-1" transition:fly={{ x: '-100%', duration: duration }} />
			<use href="#lg-cloud-1" transition:fly={{ x: '100%', duration: duration }} />
		</g>
		<g class="dark">
			<use href="#sm-asteroid-7" transition:fly={{ x: '100%', duration: duration }} />
			<use href="#sm-asteroid-7-flipped" transition:fly={{ x: '-100%', duration: duration }} />
		</g>
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

	.dark {
		:first-child {
			transform: translate(-65vh, -20vh);
		}

		:last-child {
			transform: translate(-65vh, 40vh);
		}
	}

	.light {
		:first-child {
			transform: translate(-25vh, -20vh);
			opacity: 0.85;
		}

		:last-child {
			transform: translate(-25vh, 25vh);
			opacity: 0.85;
		}
	}

	:global([data-theme='dark']) .light {
		display: none;
	}

	:global([data-theme='light']) .dark {
		display: none;
	}

	@media only screen and (width > 60rem) {
		svg {
			width: 110vw;
			height: 54vw;
		}

		.dark {
			:first-child {
				transform: translate(-5vw, -20vw);
			}

			:last-child {
				transform: translate(-5vw, 38vh);
			}
		}

		.light {
			:first-child {
				transform: translate(-5vw, -18vw);
			}

			:last-child {
				transform: translate(-5vw, 15vh);
			}
		}
	}
</style>
