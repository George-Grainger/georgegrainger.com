<script lang="ts">
	import spotifyLogo from '$lib/assets/svg/audio/spotify-logo.svg';
	import AudioPlayer from './AudioPlayer.svelte';
	import LazyImage from './LazyImage.svelte';

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
</script>

<div class="last-played-card">
	<strong>Latest song played</strong>
	<a class="spotify-link" href={playUrl} target="_blank" rel="noopener noreferrer">
		<span class="sr-only">{`Listen to ${title} on Spotify`}</span>
		<img src={spotifyLogo} alt="Spotify Logo" height="30em" width="30em" />
	</a>
	<LazyImage
		src={imgUrl}
		alt={`Album image for ${title}`}
		placholderSrc={imgPlaceholderUrl}
		loading="lazy"
	/>
	<div class="details">
		<p class="song-title">{title}</p>
		<strong class="artist">{artist}</strong>
		{#if isPlaying}
			Playing
		{/if}
	</div>
	{#if previewUrl}
		<AudioPlayer src={previewUrl} />
	{/if}
</div>

<style lang="scss">
	.last-played-card {
		display: grid;
		align-items: center;
		place-self: center;
		grid-template-columns: 1fr 1fr;
		padding: 1em;
		gap: 0.75em 1em;
		background-color: var(--card);
		border-radius: var(--border-radius);
		position: relative;

		.details {
			display: grid;

			p,
			strong {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
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
	}
</style>
