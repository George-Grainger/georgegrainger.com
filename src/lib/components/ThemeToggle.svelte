<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { fly } from 'svelte/transition';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 380 170"
	class="svg"
	fill="var(--white)"
	role="button"
	tabindex={0}
	aria-pressed={$theme.current === 'dark' ? 'true' : 'false'}
	aria-label="Dark mode"
	on:click={theme.toggle}
>
	<circle class="moon" cx="85" cy="85" r="70" mask="url(#moon-mask)" />
	<circle class="sun" cx="295" cy="85" r="70" fill="var(--yellow-2)" />
	<path
		class="stars"
		d="m242 111 3 13 13 3-13 3-3 13-3-13-13-3 13-3 3-13ZM207 31l3 13 13 3-13 3-3 13-3-13-13-3 13-3 3-13ZM297 61l3 13 13 3-13 3-3 13-3-13-13-3 13-3 3-13Z"
	/>
	<path
		class="dots"
		d="M330 37a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM345 107a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM295 137a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM225 87a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM190 147a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
	/>
	{#if $theme === 'light'}
		<g class="clouds">
			<use
				href="#sm-cloud-1"
				x="40"
				y="100"
				height="50"
				in:fly={{ y: 100, duration: 300, delay: 100 }}
				out:fly={{ x: 100, duration: 300 }}
			/>
			<use
				href="#sm-cloud-2"
				x="135"
				y="90"
				height="40"
				in:fly={{ y: 100, duration: 300 }}
				out:fly={{ x: 100, duration: 300 }}
			/>
		</g>
	{/if}
	<path
		class="plane"
		d="M384 55H-4m409-2c-2.5-.5-7 0-7 0l-6-5-1 1 1 5h-3l-4-4v1l1 3h-1l5 2s11 .5 15 0c1.1-.14 5-1.5 2-2s.5-.5-2-1Z"
		stroke="var(--white)"
		stroke-width="4"
	/>
	<defs>
		<mask id="moon-mask">
			<rect width="300" height="170" />
			<circle cx="120" cy="70" r="70" class="moon_mask" fill="hsl(230, 23%, 46%)" />
		</mask>
	</defs>
</svg>

<style lang="scss">
	.svg {
		transition: background-color var(--duration) var(--transition),
			border-color var(--duration) var(--transition);
		background-color: hsl(212, 97%, 68%);
		border: 0.15em solid var(--white);
		border-radius: 100vmax;
		height: 2em;
		position: relative;
	}

	.sun {
		transition: translate var(--duration) var(--transition),
			opacity var(--duration) var(--transition);
	}

	.moon {
		transition: opacity var(--duration) var(--transition);
	}

	.moon_mask {
		transition: translate var(--duration) var(--transition);
	}

	.stars,
	.dots {
		--_distance: 3.125rem;
		transition: translate var(--duration) var(--transition),
			opacity calc(var(--duration) * 0.5) var(--transition);
	}

	.stars {
		translate: var(--_distance);
	}

	.dots {
		translate: calc(-1 * var(--_distance));
	}

	.plane {
		opacity: 0;
	}

	:global(.light) .svg {
		.plane {
			animation: plane_move 2000ms 1 450ms;
		}

		.moon,
		.stars,
		.dots {
			opacity: 0;
		}

		.moon_mask {
			translate: 6rem;
		}
	}

	:global(.dark) .svg {
		background-color: hsl(223, 48%, 25%);
		border-color: hsl(230, 23%, 56%);

		.sun {
			translate: -8rem -0.6rem;
			opacity: 0;
		}

		.stars,
		.dots {
			translate: 0;
		}

		.moon_mask {
			transition-delay: 50ms;
		}

		.moon {
			transition-duration: calc(var(--duration) * 0.5);
		}
	}

	@keyframes plane_move {
		0% {
			opacity: 1;
			translate: -25rem;
		}
		80% {
			opacity: 1;
			translate: 0rem;
		}
		100% {
			opacity: 0;
		}
	}
</style>
