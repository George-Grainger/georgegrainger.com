<script lang="ts">
	import TopTrackCard from '$lib/components/TopTrackCard.svelte';
	import type { TopTrack } from '$lib/utils/server/spotify';

	export let topTracks: TopTrack[];

	function handleKeyDown(e: KeyboardEvent) {
		const { key, altKey, shiftKey } = e;
		const el = e.target as HTMLElement;
		const isCard = el.classList.contains('top-track-card');
		const li = el.closest('li') as HTMLElement;

		if (key == 'Escape') {
			(li.querySelector(".close-btn") as HTMLButtonElement).click()
			return;
		}
		if (!isCard || li.classList.contains('expanded')) {
			return e;
		}
		if (key == 'Tab' && isCard && shiftKey) {
			li.querySelector("button")?.focus();
			li.classList.remove('expanded');
		}

		let next: Element | null = null;
		const ol = li.parentElement as HTMLElement;

		const index = Array.from(ol.children).indexOf(li);
		const row = Math.floor(index / 3);
		const col = 1 + (index % 3);

		switch (key) {
			case 'Tab':
				if (shiftKey) {
					next = li?.previousElementSibling;
				} else {
					next = li?.nextElementSibling;
				}

				if (!next && isCard) {
					if (index == 0) {
						return e;
					}
					next = document.querySelector('.last-played-card') ;
				}
				break;
			case ' ':
			case 'Enter':
				el.click();
				break;
			case 'ArrowDown':
				if (altKey) {
					next = ol?.querySelector(`li:nth-last-child(${4 - col})`);
				} else {
					next = ol?.querySelector(`li:nth-child(${index + 4})`);
				}
				break;
			case 'ArrowRight':
				if (altKey) {
					next = ol?.querySelector(`li:nth-child(${3 * (row + 1)})`);
				} else {
					next = li?.nextElementSibling;
				}
				break;
			case 'ArrowUp':
				if (altKey) {
					next = ol?.querySelector(`li:nth-child(${col})`);
				} else {
					next = ol?.querySelector(`li:nth-child(${index - 2})`);
				}
				break;
			case 'ArrowLeft':
				if (altKey) {
					next = ol?.querySelector(`li:nth-child(${3 * row + 1})`);
				} else {
					next = li?.previousElementSibling;
				}
				break;
		}

		e.preventDefault();
		if (next?.classList.contains("last-played-card")){
			next.querySelector("a")?.focus();
		}
		else if (next) {
			next.querySelector("button")?.focus();
		}
	}
</script>

<ol>
	{#each topTracks as track}
		<TopTrackCard tag="li" on:keydown={handleKeyDown} {...track} />
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
			transform: scale(3.175);
			z-index: 1;
		}
	}

	:global([data-motion='no-preference']) ol {
		:global(li) {
			transition: transform var(--duration) var(--transition),
				z-index 1ms var(--transition) var(--duration);
		}

		:global(.expanded) {
			transition: transform var(--duration) var(--transition);
		}
	}
</style>
