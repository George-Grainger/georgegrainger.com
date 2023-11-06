<script lang="ts">
	import spotifyLogo from '$lib/assets/svg/audio/spotify-logo.svg';
	import { onMount } from 'svelte';
	import AudioPlayer from './AudioPlayer.svelte';
	import LazyImage from './LazyImage.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import { invalidateAll } from '$app/navigation';

	// Spotify Data
	export let isPlaying: string;
	// export let playedAt
	export let title: string;
	export let artist: string;
	export let imgUrl: string;
	export let imgPlaceholderUrl: string;
	export let playUrl: string;
	// Needs explicit to prevent ts error in parent
	export let previewUrl: string | undefined = undefined;

	// Stuff for the progress tracking
	export let duration: number;
	export let playedAt: Date;

	let progress = Math.min((Date.now() - playedAt.getTime()) / 1000, duration);

	async function updateProgress() {
		progress = Math.min(progress + 1, duration);

		if (progress == duration) {
			await invalidateAll();
			progress = Math.min((Date.now() - playedAt.getTime()) / 1000, duration);
		}
	}

	isPlaying &&
		onMount(() => {
			const tick = setInterval(updateProgress, 1000);

			return () => clearInterval(tick);
		});

	function handleKeyDown(e: KeyboardEvent) {
		if (!(e.shiftKey && e.key == 'Tab')) {
			return e;
		}

		const card = document.querySelector('.top-track-card:last-child') as HTMLElement;
		card.focus();
		e.preventDefault();
	}
</script>

<div class="last-played-card">
	{#if isPlaying}
		<strong>Currently Playing</strong>
	{:else}
		<strong>Last Song Played</strong>
	{/if}
	<a
		class="spotify-link"
		href={playUrl}
		target="_blank"
		rel="noopener noreferrer"
		on:keydown={handleKeyDown}
	>
		<span class="sr-only">{`Listen to ${title} on Spotify`}</span>
		<img src={spotifyLogo} alt="Spotify Logo" height="30em" width="30em" />
	</a>
	<LazyImage
		src={imgUrl}
		alt={`Album image for ${title}`}
		placholderSrc={imgPlaceholderUrl}
		loading="lazy"
	/>
	<div class="details" class:isPlaying>
		<p class="title">{title}</p>
		<strong class="artist">{artist}</strong>
		{#if isPlaying}
			<small>I'm currently listening at...</small>
			<ProgressBar time={progress} {duration} />
			<p class="tagline">Stick around to see what I listen to next</p>
		{:else}
			<small>Played on {playedAt.toLocaleString().replace(',', ' at ')}</small>
			<p class="tagline">Check again when I'm playing to see a live feed</p>
		{/if}
	</div>
	{#if previewUrl}
		<AudioPlayer src={previewUrl} />
	{/if}
</div>

<style lang="scss">
	.last-played-card {
		--progress-color: var(--spotify-green);

		display: grid;
		align-items: center;
		place-self: center;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto 18rem auto;
		padding: 1em;
		gap: 0.75em 1em;
		background-color: var(--card);
		border-radius: var(--border-radius);
		position: relative;

		.details {
			display: grid;
			gap: 0.25em;

			.title,
			strong {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.title {
				font-size: 1.25em;
			}

			small {
				margin-block: 0.25em;
				font-size: 0.75em;
				color: var(--hover-inverse);
			}

			.tagline {
				margin-top: 1.5em;
				font-size: 0.85em;
			}

			:global(.progress-bar) {
				--progress-color: var(--spotify-green);
				font-size: 1.5em;
			}

			&.isPlaying {
				small {
					margin-top: 0.75em;
				}

				.tagline {
					margin-top: 0.75em;
				}
			}
		}

		a {
			display: flex;
			justify-self: end;
			border-radius: var(--border-radius);
			transition: scale var(--duration) var(--transition);
			transform-origin: center;

			&:hover {
				scale: 1.1;
			}
		}

		img {
			aspect-ratio: 1;
		}

		:global(.player) {
			font-size: 1.5em;
		}

		:global(.play) {
			background-color: var(--text);

			:global(svg) {
				fill: var(--inverse);
			}
		}

		:global(.mute svg) {
			fill: var(--text);
		}
	}
</style>
