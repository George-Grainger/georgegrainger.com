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
	import { disableScrollHandling, onNavigate } from '$app/navigation';
	import { motion } from '$lib/stores/motion';

	// Page transitions
	$: duration = $motion === motion.NO_PREFERENCE ? 400 : 0;
	let showClouds = false;
	let beenDuration = true;
	let scrollOffset = 0;

	onNavigate((e) => {
		// Don't delay when navigating on mobile
		if (!showClouds && $motion == motion.NO_PREFERENCE) {
			const changed = !e.willUnload && e.from?.route.id != e.to?.route.id;
			// Prevent scroll bug on locale change
			!changed && disableScrollHandling();
			showClouds = changed;
			beenDuration = !changed;
			setTimeout(() => (beenDuration = true), duration / 0.75);
		}

		// Callback to run after DOM update
		return () => {
			scrollOffset = 0;
			showClouds = false;
		};
	});

	function scrollY() {
		// Prevents issue where moves to top of page of nav bar open
		document.documentElement.style.setProperty('scroll-behavior', 'unset');
		scrollTo(0, scrollOffset);
		document.documentElement.style.removeProperty('scroll-behavior');
	}

	function calcScrollY() {
		scrollOffset = document.documentElement.scrollTop;

		const projectCards = document.getElementById('projects')?.querySelectorAll('article');
		if (projectCards) {
			const cards = Array.from(projectCards || []).map((node) => {
				const nodeRect = node.getBoundingClientRect();
				const offset = parseFloat(node.style.getPropertyValue('margin-bottom'));
				return { top: nodeRect.top, bottom: nodeRect.bottom, offset };
			});
			const cardsAbove = cards.filter(({ bottom, offset }) => bottom + offset < 0);
			const minOffsets = cardsAbove.reduce((acc: { [key: number]: number }, { top, offset }) => {
				acc[top] = Math.min(offset, acc[top] || 0);
				return acc;
			}, {});

			// Ensure project card offset doesn't mess up position
			scrollOffset += Object.values(minOffsets).reduce((acc, offset) => acc - offset, 0);
		}
	}
</script>

<Nav bind:showClouds />

{#if !showClouds && beenDuration}
	<main
		on:introstart={scrollY}
		on:outrostart={calcScrollY}
		transition:fade={{ duration: duration }}
	>
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
			<use href="#asteroid-7" transition:fly={{ x: '100%', duration: duration, opacity: 1 }} />
			<use
				href="#asteroid-7-flipped"
				transition:fly={{ x: '-100%', duration: duration, opacity: 1 }}
			/>
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
			transform: translate(-25vh, -19vh);
			transform: translate(-25lvh, -19lvh);
		}

		:last-child {
			transform: translate(-32vh, 42vh);
			transform: translate(-32lvh, 42lvh);
		}
	}

	.light {
		:first-child {
			transform: translate(-25vh, -20vh);
			transform: translate(-25lvh, -20lvh);
			opacity: 0.85;
		}

		:last-child {
			transform: translate(-25vh, 25vh);
			transform: translate(-25lvh, 25lvh);
			opacity: 0.85;
		}
	}

	:global([data-theme='dark']) .light {
		display: none;
	}

	:global([data-theme='light']) .dark {
		display: none;
	}

	@media only screen and (min-width: 60rem) {
		svg {
			width: 110vw;
			height: 54vw;
		}

		.dark {
			:first-child {
				transform: translate(-5vw, -20vw);
			}

			:last-child {
				transform: translate(-5vw, 43vh);
				transform: translate(-5vw, 43lvh);
			}
		}

		.light {
			:first-child {
				transform: translate(-5vw, -18vw);
			}

			:last-child {
				transform: translate(-5vw, 15vh);
				transform: translate(-5vw, 15lvh);
			}
		}
	}
</style>
