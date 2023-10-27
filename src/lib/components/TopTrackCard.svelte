<script lang="ts">
	import spotifyLogo from '$lib/assets/svg/SpotifyLogo.svg';
	import cross from '$lib/assets/svg/Cross.svg';

	export let tag = 'div';

	// Spotify Data
	export let title: string;
	export let artist: string;
	export let imgUrl: string;
	export let imgPlaceholderUrl: string;
	export let playUrl: string;
	export let previewUrl: string;
</script>

<svelte:element this={tag} class="top-track-card" tabIndex={0}>
	<img src={imgUrl} alt={`Album image for ${title}`} loading="lazy" />
	<button>
		<span class="sr-only">Close</span>
		<img class="close" src={cross} alt="" height="15em" width="15em" />
	</button>
	<div class="details">
		<p>{title}</p>
		<a href={playUrl} target="_blank" rel="noopener noreferrer">
			<span class="sr-only">{`Listen to ${title} on Spotify`}</span>
			<img src={spotifyLogo} alt="Spotify Logo" height="80em" width="80em" />
		</a>
		<strong>{artist}</strong>
		<!-- {#if previewUrl}
			<p>{previewUrl}</p>
		{/if} -->
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
		}

		.close {
			position: absolute;
			top: calc(5% - 0.25rem);
			right: calc(5% - 0.25rem);
			opacity: 0;
			filter: drop-shadow(0 0 0.075rem var(--black));
			transition: opacity var(--duration) var(--transition);
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
			font-size: 0.5em;
			transition: transform var(--duration) var(--transition);

			p,
			strong {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			strong {
				font-weight: 600;
				font-size: 0.75em;
			}

			a {
				grid-row: span 2;
				align-self: center;
				display: flex;
			}
		}

		&:focus-within {
			cursor: default;

			.close {
				opacity: 1;
			}

			.details {
				transform: translateY(0%);
			}
		}
	}
</style>
