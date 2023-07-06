<script lang="ts">
	import { theme } from '$lib/stores/theme';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 380 170"
	fill="var(--white)"
	role="button"
	tabindex={0}
	aria-pressed={$theme === 'dark' ? 'true' : 'false'}
	aria-label="Dark mode"
	on:click={theme.toggle}
	on:keypress={theme.toggle}
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

	<g class="clouds">
		<use href="#sm-cloud-1" x="40" y="100" height="50" />
		<use href="#sm-cloud-2" x="135" y="90" height="40" />
	</g>

	<defs>
		<mask id="moon-mask">
			<rect width="300" height="170" />
			<circle cx="120" cy="70" r="70" class="moon-mask" fill="hsl(230, 23%, 46%)" />
		</mask>
	</defs>
</svg>

<style lang="scss">
	svg {
		background-color: hsl(212, 97%, 68%);
		outline: 0.2em solid var(--white);
		border-radius: 100vmax;
		height: 2em;
		position: relative;
		transition: background-color var(--duration) var(--transition),
			border-color var(--duration) var(--transition);
	}

	.moon {
		transition: opacity var(--duration) var(--transition);
	}

	.moon-mask {
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

	.clouds use:last-child {
		--_delay: calc(var(--duration) * -0.33);
	}

	:global(.light) svg {
		.sun {
			transition: translate calc(var(--duration) * 0.75) var(--transition)
					calc(var(--duration) * 0.25),
				opacity var(--duration) var(--transition);
		}

		.moon,
		.stars,
		.dots {
			opacity: 0;
		}

		.clouds use {
			animation: cloud-to-light var(--duration) var(--_delay, 0ms);
		}

		.moon-mask {
			translate: 6rem;
		}
	}

	:global(.dark) svg {
		background-color: hsl(223, 48%, 25%);
		outline-color: hsl(230, 23%, 56%);

		.sun {
			transition: translate var(--duration) var(--transition),
				opacity calc(var(--duration) * 0.75) var(--transition) calc(var(--duration) * 0.25);
			translate: -11rem -0.8rem;
			opacity: 0;
		}

		.stars,
		.dots {
			translate: 0;
		}

		.moon-mask {
			transition-delay: 50ms;
		}

		.moon {
			transition-duration: calc(var(--duration) * 0.5);
		}

		.clouds use {
			transition: translate var(--duration) var(--transition);
			translate: 12.5rem 0;
		}
	}

	@keyframes cloud-to-light {
		from {
			translate: 0 12.5rem;
		}
		to {
			translate: 0 0;
		}
	}
</style>
