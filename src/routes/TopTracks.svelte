<script lang="ts">
	import TopTrackCard from '$lib/components/TopTrackCard.svelte';
	import type { TopTrack } from '$lib/utils/server/spotify';

	export let topTracks: TopTrack[];

	function handleKeyDown(e: KeyboardEvent) {
		const { key, altKey, shiftKey } = e;
		const el = e.target as HTMLElement;
		const isCard = el.classList.contains('top-track-card');

		if (key == 'Escape' || (key == 'Tab' && isCard && shiftKey)) {
			const li = el.closest('li') as HTMLElement;
			li.focus();
			li.classList.remove('expanded');
		}

		if (!isCard || el.classList.contains('expanded')) {
			return e;
		}

		let next: Element | null = null;
		const ul = e.currentTarget as HTMLElement;

		const index = Array.from(ul.children).indexOf(el);
		const row = Math.floor(index / 3);
		const col = 1 + (index % 3);

		switch (key) {
			case 'Tab':
				if (shiftKey) {
					next = el?.previousElementSibling;
				} else {
					next = el?.nextElementSibling;
				}

				if (!next && isCard) {
					next = document.querySelector('.last-played-card .spotify-link');
				}
				break;
			case ' ':
			case 'Enter':
				el.click();
				break;
			case 'ArrowDown':
				if (altKey) {
					next = ul?.querySelector(`li:nth-last-child(${4 - col})`);
				} else {
					next = ul?.querySelector(`li:nth-child(${index + 4})`);
				}
				break;
			case 'ArrowRight':
				if (altKey) {
					next = ul?.querySelector(`li:nth-child(${3 * (row + 1)})`);
				} else {
					next = el?.nextElementSibling;
				}
				break;
			case 'ArrowUp':
				if (altKey) {
					next = ul?.querySelector(`li:nth-child(${col})`);
				} else {
					next = ul?.querySelector(`li:nth-child(${index - 2})`);
				}
				break;
			case 'ArrowLeft':
				if (altKey) {
					next = ul?.querySelector(`li:nth-child(${3 * row + 1})`);
				} else {
					next = el?.previousElementSibling;
				}
				break;
		}

		e.preventDefault();
		if (next) {
			(next as HTMLElement)?.focus();
		}
	}
</script>

<ol on:keydown={handleKeyDown}>
	{#each topTracks as track}
		<TopTrackCard tag="li" {...track} />
	{/each}
</ol>

<style lang="scss">
	ol {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		place-content: center;
		gap: 1.5%;
		aspect-ratio: 1;

		:global(li) {
			z-index: 0;
			transform-origin: var(--_horizontal, 50%) var(--_vertical, 50%);
			transition: transform var(--duration) var(--transition),
				z-index 1ms var(--transition) var(--duration);

			&:nth-child(-n + 3) {
				--_vertical: 2.5%;
			}

			&:nth-child(n + 7) {
				--_vertical: 98.5%;
			}

			&:nth-child(3n + 1) {
				--_horizontal: 2.5%;
			}

			&:nth-child(3n + 3) {
				--_horizontal: 98.5%;
			}
		}

		// This doesn't work when nested?
		:global(.expanded) {
			transition: transform var(--duration) var(--transition);
			transform: scale(3.175);
			z-index: 1;
		}
	}
</style>
