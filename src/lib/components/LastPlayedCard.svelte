<script lang="ts">
	import spotifyLogo from '$lib/assets/svg/audio/spotify-logo.svg';
	import { onMount } from 'svelte';
	import AudioPlayer from './AudioPlayer.svelte';
	import LazyImage from './LazyImage.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import { invalidate } from '$app/navigation';

	export let title: string;
	export let artist: string;
	export let imgUrl: string;
	export let imgPlaceholderUrl: string;
	export let playUrl: string;
	// Needs explicit to prevent ts error in parent
	export let previewUrl: string | undefined = undefined;

	// Stuff for the progress tracking
	export let duration: number;
	export let playedAt: string;
	export let isPlaying: boolean;
	export let isOffline: boolean;

	import { t, locale, defaultLocaleVariant } from '$lib/translations';
	let playedAtDate = new Date(playedAt);
	let progress = Math.min((Date.now() - playedAtDate.getTime()) / 1000, duration);
	let tick: ReturnType<typeof setTimeout>;

	async function HandleRefetch() {
		clearInterval(tick);
		await invalidate('/api/recently-played');
		playedAtDate = new Date(playedAt);
		progress = Math.min((Date.now() - playedAtDate.getTime()) / 1000, duration);
		tick = setInterval(updateProgress, 1000);
	}

	async function updateProgress() {
		progress = Math.min(progress + 1, duration);

		if (progress == duration) {
			HandleRefetch();
		}
	}

	isPlaying &&
		onMount(() => {
			tick = setInterval(updateProgress, 1000);

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
	<strong class="header">
		{#if isPlaying}
			{$t('home.currently-playing')}
		{:else if isOffline}
			{$t('home.personal-favourite')}
		{:else}
			{$t('home.latest-song')}
		{/if}
	</strong>
	<a
		class="spotify-link"
		href={playUrl}
		target="_blank"
		rel="noopener noreferrer"
		on:keydown={handleKeyDown}
	>
		<span class="sr-only">{$t('home.spotify-sr-only', { title })}</span>
		<img src={spotifyLogo} alt={$t('home.spotify-logo')} />
	</a>
	<LazyImage
		src={imgUrl}
		alt={$t('home.album-img-alt', { title })}
		placeholderSrc={imgPlaceholderUrl}
		loading="lazy"
	/>
	<div class="details" class:isPlaying>
		<p class="title">{title}</p>
		<strong class="artist">{artist}</strong>
		{#if isPlaying}
			<small>{$t('home.current-intro')}</small>
			<ProgressBar time={progress} {duration} />
			<p class="tagline">{$t('home.stick-around')}</p>
		{:else if isOffline}
			<small>{$t('home.no-spotify')}</small>
			<p class="tagline">{$t('home.last-played-tagline')}</p>
		{:else}
			<small>
				{$t('home.played-on', {
					date: playedAtDate.toLocaleString(defaultLocaleVariant[$locale], { dateStyle: 'short' }),
					time: playedAtDate.toLocaleTimeString(defaultLocaleVariant[$locale], {
						timeStyle: 'short',
						hourCycle: 'h24'
					})
				})}
			</small>
			<p class="tagline">{$t('home.last-played-tagline')}</p>
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
		grid-template-columns: 1fr 1fr 1fr 1fr;
		padding: 1em;
		gap: 0.75em 1em;
		background-color: var(--card);
		border-radius: var(--border-radius);
		position: relative;

		.header {
			grid-column: span 3;
		}

		// Target the lazy image and details
		:global(> div) {
			grid-column: span 2;
		}

		// Prevent height of image from stretching
		:global(.lazy-img) {
			height: initial;
		}

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
			height: 1.5em;
			aspect-ratio: 1;
		}

		:global(.player) {
			grid-column: 1 / -1;
			font-size: 1.5em;
		}

		:global(.mute svg) {
			fill: var(--text);
		}
	}

	@media only screen and (width <= 40rem) {
		.header {
			font-size: 0.9em;
		}

		.details {
			font-size: 0.75em;
		}
	}
</style>
