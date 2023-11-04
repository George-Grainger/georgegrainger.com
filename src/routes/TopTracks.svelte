<script lang="ts">
	import TopTrackCard from '$lib/components/TopTrackCard.svelte';
	import type { TopTrack } from '$lib/utils/server/spotify';

	export let topTracks: TopTrack[];

	function handleKeyDown(e: KeyboardEvent) {
		const { key, altKey } = e;

		// let next: HTMLElement | undefined;

		switch (key) {
			case 'Escape':
			case 'Tab':
				break;
			case 'Enter':
				break;
			case 'ArrowDown':
				if (altKey) {
					break;
				}
			/* falls through */
			case 'ArrowRight':
				e.preventDefault();
				// next = current?.nextElementSibling as HTMLElement;
				if (altKey) {
					// next = ul.lastElementChild as HTMLElement;
				}
				break;
			case 'ArrowUp':
				if (altKey) {
					// setExpanded(false);
					break;
				}
			/* falls through */
			case 'ArrowLeft':
				e.preventDefault();
				// next = current?.previousElementSibling as HTMLElement;
				if (altKey) {
					// next = ul.firstElementChild as HTMLElement;
				}
				break;
		}

		// if (next) {
		// }
	}
</script>

<ul on:keydown={handleKeyDown}>
	{#each topTracks as track}
		<TopTrackCard tag="li" {...track} />
	{/each}
</ul>

<style lang="scss">
	ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;
		gap: 0.5em;
		aspect-ratio: 1;

		:global(li) {
			z-index: 0;
			transform-origin: var(--_horizontal, 50%) var(--_vertical, 50%);
			transition: transform var(--duration) var(--transition),
				z-index 1ms var(--transition) var(--duration);

			&:nth-child(-n + 3) {
				--_vertical: 1%;
			}

			&:nth-child(n + 7) {
				--_vertical: 99%;
			}

			&:nth-child(3n + 1) {
				--_horizontal: 1%;
			}

			&:nth-child(3n + 3) {
				--_horizontal: 99%;
			}
		}

		// This doesn't work when nested?
		:global(.expanded) {
			transition: transform var(--duration) var(--transition);
			transform: scale(3.15);
			z-index: 1;
		}
	}
</style>
