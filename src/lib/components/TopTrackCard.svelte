<script lang="ts">
	import spotifyLogo from '$lib/assets/svg/audio/spotify-logo.svg';
	import LazyImage from './LazyImage.svelte';
	import AudioPlayer, { pauseCurrent } from './AudioPlayer.svelte';
	import { autoplay } from '$lib/stores/autoplay';
	import { clickoutside } from '$lib/hooks/use-click-outide';
	import Cross from '$lib/assets/svg/audio/Cross.svelte';
	import { t } from '$lib/translations';

	export let tag = 'div';

	// Spotify Data
	export let title: string;
	export let creator: string;
	export let imgUrl: string;
	export let imgPlaceholderUrl: string;
	export let playUrl: string;
	// Needs explicit to prevent ts error in parent
	export let previewUrl: string | undefined = undefined;

	export let expanded = false;

	// Play audio if autoplay is true
	function handleClick(e: MouseEvent) {
		expanded = true;
		if ($autoplay === autoplay.OFF) return;

		const el = e.target as HTMLElement;
		const audio = el.closest(tag)?.querySelector('audio');
		audio?.play();
	}

	function handleClickOutside() {
		expanded = false;
		pauseCurrent();
	}

	function handleClose(e: Event) {
		const button = e.currentTarget as HTMLButtonElement;
		(button.closest('.top-track-card') as HTMLElement)?.focus();
		handleClickOutside();
		e.stopPropagation();
		e.preventDefault();
	}

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key == 'Escape' || e.key == ' ' || e.key == 'Enter' || (e.shiftKey && e.key == 'Tab')) {
			handleClose(e);
		}
	}

	function handleAudioKeyPress(e: KeyboardEvent) {
		if (e.key != 'Tab' || e.shiftKey) {
			return e;
		}

		const el = e.target as HTMLButtonElement;
		if (!el.classList.contains('mute')) {
			return e;
		}

		const closeButton = el.closest(tag)?.querySelector('.close') as SVGElement;
		closeButton.focus();
		e.preventDefault();
	}
</script>

<svelte:element this={tag} class:expanded class="top-track-item">
	<button
		on:click={handleClick}
		on:keydown
		use:clickoutside={{ enabled: expanded, callback: handleClickOutside }}
		class="top-track-card"
		aria-pressed={expanded ? 'true' : 'false'}
		tabindex={0}
	>
		<LazyImage
			src={imgUrl}
			alt={$t('home.album-img-alt', { title })}
			placeholderSrc={imgPlaceholderUrl}
			loading="lazy"
		/>
		<button
			class="close-btn"
			aria-label="Close Card"
			on:click={handleClose}
			on:keydown={handleKeyPress}
		>
			<span class="sr-only">{$t('home.close')}</span>
			<Cross class="close" fill="var(--white)" height="1em" width="1em" tabindex="0" />
		</button>
		<div class="details">
			<p>{title}</p>
			<a href={playUrl} target="_blank" rel="noopener noreferrer">
				<span class="sr-only">{`Listen to ${title} on Spotify`}</span>
				<img src={spotifyLogo} alt="Spotify Logo" />
			</a>
			<strong>{creator}</strong>
			{#if previewUrl}
				<AudioPlayer on:keydown={handleAudioKeyPress} src={previewUrl} />
			{/if}
		</div>
	</button>
</svelte:element>

<style lang="scss">
	:global([data-motion='no-preference']) {
		.close-btn :global(svg) {
			transition: opacity var(--duration) var(--transition);
		}

		.details {
			transition: transform var(--duration) var(--transition);
		}
	}

	.top-track-item {
		position: relative;
		color: var(--white);
		cursor: pointer;
		overflow: clip;
		border-radius: calc(0.5 * var(--border-radius));

		&:has(> :focus-visible) {
			outline: solid var(--red) 0.3em;
		}
	}

	.top-track-card {
		border: none;
		aspect-ratio: 1;

		img {
			aspect-ratio: 1;
		}

		:global(.lazy-img) {
			border-radius: calc(0.5 * var(--border-radius));
		}
	}

	.close-btn {
		display: contents;

		:global(svg) {
			position: absolute;
			padding: 0.25em;
			top: calc(5% - 0.25em);
			right: calc(5% - 0.25em);
			opacity: 0;
			border-radius: 100vmax;
			filter: drop-shadow(0 0 0.075rem var(--black));

			&:focus-visible {
				outline-offset: -0.175em;
				outline: solid var(--red) 0.067em;
			}
		}
	}

	.details {
		position: absolute;
		display: grid;
		grid-template-columns: auto 1.85em;
		column-gap: 1em;
		inset: auto 0 -1px;
		padding: 15% 5% 5%;
		background-image: linear-gradient(transparent 5%, var(--black) 75%);
		transform: translateY(100%);
		font-size: 0.25em;

		p,
		strong {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: left;
		}

		p {
			font-size: 1.5em;
		}

		strong {
			font-size: 1.1em;
		}

		a {
			grid-row: span 2;
			align-self: center;
			transition: scale var(--duration) var(--transition);

			&:hover {
				scale: 1.1;
			}
		}

		:global(.player) {
			font-size: 2em;
		}
	}

	.expanded {
		&:has(> :focus-visible) {
			outline: solid var(--red) 0.095em;
		}

		.top-track-card {
			cursor: default;
		}

		.close-btn :global(svg) {
			opacity: 1;
		}

		.details {
			transform: translateY(0%);
		}
	}
</style>
