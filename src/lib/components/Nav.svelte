<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import Option from '$lib/components/Option.svelte';
	import Select from '$lib/components/Select.svelte';
	import { motion } from '$lib/stores/motion';
	import AnimationIcon from '$lib/assets/svg/AnimationIcon.svelte';
	import FranceFlag from '$lib/assets/svg/flags/FranceFlag.svelte';
	import UkFlag from '$lib/assets/svg/flags/UKFlag.svelte';
	import { onMount } from 'svelte';
	import { afterNavigate, disableScrollHandling, goto, onNavigate } from '$app/navigation';
	import { t, locale } from '$lib/translations';
	import { page } from '$app/stores';

	// Handle showing clouds for hamburger menu
	export let showClouds: boolean;
	let showLinks = false;

	onNavigate(() => {
		showLinks = false;
	});

	function handleHamburgerPress() {
		showLinks = !showLinks;
		showClouds = showLinks;
	}

	function removeHamburgerOnDesktop() {
		if (window.matchMedia('(width > 60rem)').matches) {
			showClouds = false;
		}
	}

	onMount(() => {
		window.addEventListener('resize', removeHamburgerOnDesktop);
		return () => window.removeEventListener('resize', removeHamburgerOnDesktop);
	});

	// Prevent scrolling issue caused by redirecting from /en to /
	afterNavigate((e) => {
		if (e.from?.route?.id !== e.to?.route?.id) {
			return;
		}

		if (e.from?.params?.lang !== e.to?.params?.lang) {
			disableScrollHandling();
		}
	});
</script>

<nav aria-label={$t('global.nav-label')}>
	<ul class:showLinks class="links">
		{#each $t('global.nav-links') as { text, link }}
			<li>
				<a href={`/${$locale}${link}`}>{text}</a>
			</li>
		{/each}
	</ul>
	<ul class="settings">
		<li>
			<ThemeToggle height="2em" />
		</li>
		<li class="select motion-select">
			<Select id="motion-select" referBy="Motion Preference" bind:selected={$motion}>
				<Option value={'no-preference'}>
					<span>{$t('global.motion.no-preference')}</span>
					<AnimationIcon />
				</Option>
				<Option value={'reduce'}>
					<span>{$t('global.motion.reduce')}</span>
					<AnimationIcon disabled={true} />
				</Option>
			</Select>
		</li>
		<li class="select language-select">
			<Select
				id="language-select"
				referBy="Language"
				bind:selected={$locale}
				on:change={() => {
					goto(`/${$locale}${$page.data.route}`, {
						replaceState: true,
						keepFocus: true,
						noScroll: true
					});
				}}
			>
				<Option value={'en'}>
					<UkFlag />
					<span>En</span>
				</Option>
				<Option value={'fr'}>
					<FranceFlag />
					<span>Fr</span>
				</Option>
			</Select>
		</li>
	</ul>
	<button class="hamburger" on:click={handleHamburgerPress}>
		<svg viewBox="0 0 24 24">
			<title>{$t('global.hamburger-menu')}</title>
			<path
				fill="currentColor"
				d="M4 18q-.425 0-.713-.288T3 17q0-.425.288-.713T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18H4Zm0-5q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13H4Zm0-5q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8H4Z"
			/>
		</svg>
	</button>
</nav>

<style lang="scss">
	nav {
		--_size: 0.15em;
		--_border-size: 0.15rem;
		--_svg-height: 1.5em;
		--_select-fs: 0.9em;

		display: flex;
		justify-content: space-between;
		gap: 0.5rem;

		font-weight: 600;
		font-size: clamp(1.25rem, 3.9vw, 1.525rem);

		margin: 1rem auto 2rem;
		width: var(--page-width);

		top: 1rem;
		position: sticky;
		z-index: 10;
	}

	ul {
		display: contents;
	}

	.links {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1em;
		gap: 1.5em;
		position: fixed;
		inset: 3em 7.5vw 4em;
		font-size: 1.5em;
		opacity: 0;
		pointer-events: none;
		color: var(--black);

		&.showLinks {
			--_delay: var(--duration);
			opacity: 1;
			pointer-events: auto;
		}
	}

	li {
		display: flex;
		align-items: center;
	}

	a {
		text-decoration: none;
	}

	.hamburger {
		--_size: 0.275em;

		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;

		font-size: var(--_select-fs);
		border: var(--_border-size) solid currentColor;
		border-radius: var(--border-radius);
		background-color: var(--inverse);
		padding: var(--_size);

		svg {
			height: var(--_svg-height);
		}
	}

	.select :global(button span) {
		display: none;
	}

	:global([data-motion='no-preference']) {
		.links {
			transition: opacity var(--duration) var(--transition) var(--_delay, 0ms);
		}
	}

	:global([data-theme='dark']) {
		a {
			text-shadow: 1px 1px 10px var(--background);
		}
	}

	@media only screen and (width > 40rem) {
		nav {
			--svg-height: 1.5em;
		}

		.hamburger {
			--_size: 0.15em;
		}

		.motion-select {
			--_size: 0.4em;

			:global(button) {
				:global(span) {
					display: inherit;
				}

				:global(svg) {
					display: none;
				}
			}
		}
	}

	@media only screen and (width > 60rem) {
		.links {
			display: contents;
			font-size: inherit;
			pointer-events: auto;
			color: currentColor;
		}

		.hamburger {
			display: none;
		}
	}
</style>
