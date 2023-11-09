<script lang="ts">
	import spotifyLogo from '$lib/assets/svg/audio/spotify-logo.svg';
	import LazyImage from './LazyImage.svelte';
	import AudioPlayer, { pauseCurrent } from './AudioPlayer.svelte';
	import { autoplay } from '$lib/stores/autoplay';
	import { clickoutside } from '$lib/hooks/use-click-outide';
	import Cross from '$lib/assets/svg/audio/Cross.svelte';

	export let tag = 'div';

	// Spotify Data
	export let title: string;
	export let artist: string;
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
		let button = e.currentTarget as HTMLButtonElement;
		button.closest('li')?.focus();
		handleClickOutside();
		e.stopPropagation();
		e.preventDefault();
	}

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key == ' ' || e.key == 'Enter' || (e.shiftKey && e.key == 'Tab')) {
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

		const closeButton = el.closest('li')?.querySelector('.close') as SVGElement;
		closeButton.focus();
		e.preventDefault();
	}
</script>

<svelte:element
	this={tag}
	on:click={handleClick}
	use:clickoutside={{ enabled: expanded, callback: handleClickOutside }}
	class:expanded
	class="top-track-card"
	tabIndex={0}
>
	<LazyImage
		src={imgUrl}
		alt={`Album image for ${title}`}
		placeholderSrc={imgPlaceholderUrl}
		loading="lazy"
	/>
	<button aria-label="Close Card" on:click={handleClose} on:keydown={handleKeyPress}>
		<span class="sr-only">Close</span>
		<Cross class="close" fill="var(--white)" height="1em" width="1em" tabindex="0" />
	</button>
	<div class="details">
		<p>{title}</p>
		<a href={playUrl} target="_blank" rel="noopener noreferrer">
			<span class="sr-only">{`Listen to ${title} on Spotify`}</span>
			<img src={spotifyLogo} alt="Spotify Logo" />
		</a>
		<strong>{artist}</strong>
		{#if previewUrl}
			<AudioPlayer on:keydown={handleAudioKeyPress} src={previewUrl} />
		{/if}
	</div>
</svelte:element>

<style lang="scss">
	.top-track-card {
		border-radius: calc(0.5 * var(--border-radius));
		position: relative;
		aspect-ratio: 1;
		color: var(--white);
		overflow: clip;
		cursor: pointer;

		img {
			aspect-ratio: 1;
		}

		button {
			display: contents;

			:global(svg) {
				position: absolute;
				padding: 0.25em;
				top: calc(5% - 0.25em);
				right: calc(5% - 0.25em);
				opacity: 0;
				border-radius: 100vmax;
				filter: drop-shadow(0 0 0.075rem var(--black));
				transition: opacity var(--duration) var(--transition);

				&:focus-visible {
					outline-offset: -0.175em;
					outline: solid var(--red) 0.067em;
				}
			}
		}

		.details {
			position: absolute;
			display: grid;
			grid-template-columns: auto 1.25em;
			column-gap: 1em;
			inset: auto 0 -1px;
			padding: 15% 5% 5%;
			background-image: linear-gradient(transparent 5%, var(--black) 75%);
			transform: translateY(100%);
			font-size: 0.4em;
			transition: transform var(--duration) var(--transition);

			p,
			strong {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			strong {
				font-size: 0.75em;
			}

			a {
				grid-row: span 2;
				align-self: center;
				display: flex;
				transition: scale var(--duration) var(--transition);
				transform-origin: center;

				&:hover {
					scale: 1.1;
				}
			}
		}

		&.expanded {
			cursor: default;

			button :global(svg) {
				opacity: 1;
			}

			.details {
				transform: translateY(0%);
			}
		}

		:global(.player) {
			font-size: 1.25em;
		}
	}
</style>
