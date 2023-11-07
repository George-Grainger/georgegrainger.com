<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { getContext } from 'svelte';

	const { t } = getContext('translations');

	export let height: string | number | undefined = undefined;
	export let width: string | number | undefined = undefined;

	function handleKeyDown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowUp':
			case 'ArrowLeft':
				theme.set(theme.DARK);
				break;
			case 'ArrowDown':
			case 'ArrowRight':
				theme.set(theme.LIGHT);
				break;
			case ' ':
			case 'Enter':
				theme.toggle();
				break;
		}
	}
</script>

<svg
	{height}
	{width}
	viewBox="0 0 380 170"
	fill="var(--white)"
	role="button"
	tabindex={0}
	aria-pressed={$theme === theme.DARK ? 'true' : 'false'}
	aria-label={$t('global.theme-toggle')}
	on:click={theme.toggle}
	on:keydown={handleKeyDown}
>
	<title>{$t('global.theme-toggle')}</title>
	<circle class="sun-moon" cx="85" cy="85" r="70" mask="url(#moon-mask)" />
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

	<path
		class="plane"
		d="M384 55H-4m409-2c-2.5-.5-7 0-7 0l-6-5-1 1 1 5h-3l-4-4v1l1 3h-1l5 2s11 .5 15 0c1.1-.14 5-1.5 2-2s.5-.5-2-1Z"
		stroke="var(--white)"
		stroke-width="4"
	/>

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
		border: 0.15em solid var(--white);
		border-radius: 100vmax;
		position: relative;
		contain: content;
	}

	.sun-moon {
		transition: translate var(--duration) var(--transition), fill var(--duration) var(--transition);
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
		--_delay: calc(var(--duration) * -0.25);
	}

	.plane {
		opacity: 0;
	}

	:global([data-theme='light']) svg {
		.stars,
		.dots {
			opacity: 0;
		}

		.clouds use {
			animation: cloud-to-light var(--duration) var(--_delay, 0ms);
		}

		.sun-moon {
			fill: var(--yellow-2);
			translate: 13rem;
		}

		.plane {
			animation: plane-move calc(6 * var(--duration)) 1 calc(1.25 * var(--duration));
		}

		.moon-mask {
			translate: 8rem -4rem;
		}
	}

	:global([data-theme='dark']) svg {
		background-color: hsl(223, 48%, 25%);
		border-color: hsl(230, 23%, 56%);

		.stars,
		.dots {
			translate: 0;
		}

		.clouds use {
			translate: 6.75rem;
			opacity: 0;
			transition: translate var(--duration) var(--transition),
				opacity var(--duration) var(--transition);
		}

		.moon-mask {
			transition-delay: 50ms;
		}
	}

	@keyframes cloud-to-light {
		from {
			translate: 0 12.5rem;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	@keyframes plane-move {
		0% {
			opacity: 1;
			translate: -25rem;
		}
		60% {
			opacity: 1;
			translate: 0rem;
		}
	}
</style>
