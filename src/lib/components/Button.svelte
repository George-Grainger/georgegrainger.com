<script lang="ts">
	import CondtionalLink from './CondtionalLink.svelte';

	export let href = '';
	export let target = '';
	export let rel = '';
	export let download = '';
</script>

<CondtionalLink class="btn" {href} {target} {rel} {download} fallback="button">
	<strong><slot>Button Text</slot></strong>
	<span>
		<svg viewBox="0 0 66 43" fill="currentColor">
			<path d="m0 4 4-4h1l21 21a1 1 0 0 1 0 1L5 43H4l-4-4v-1l17-16v-1L0 5a1 1 0 0 1 0-1Z" />
			<path d="m20 4 4-4h1l21 21a1 1 0 0 1 0 1L25 43h-1l-4-4a1 1 0 0 1 0-1l17-16v-1L20 5V4Z" />
			<path d="m40 4 4-4h1l21 21a1 1 0 0 1 0 1L45 43h-1l-4-4a1 1 0 0 1 0-1l17-16v-1L40 5V4Z" />
		</svg>
	</span>
</CondtionalLink>

<style lang="scss">
	// Global to prevent purging
	:global(.btn) {
		position: relative;
		display: flex;
		width: fit-content;
		height: fit-content;
		margin-inline: auto;
		gap: 0.25em;
		padding: 0.25em 1em;
		background-color: var(--purple);
		color: var(--white);
		text-transform: uppercase;
		transform: skewX(-15deg);
		text-decoration: none;
		transition: scale var(--duration) var(--transition);
		border: none;
		contain: layout;

		&:focus-visible {
			border-radius: 0;
		}

		&::before,
		&::after {
			content: '';
			position: absolute;
			background-color: var(--text);
			transform-origin: top left;
			transition: transform var(--duration) var(--transition);
		}

		&::before {
			inset: 100% -0.25rem -0.25rem 0.25rem;
		}

		&::after {
			inset: 0.25rem -0.25rem -0.25rem 100%;
		}

		&:focus-visible,
		&:hover {
			scale: calc(1 / 0.9) 1;

			&::before {
				background-color: var(--yellow-2);
				transform: translateX(0.1rem) scaleY(1.4);
			}

			&::after {
				background-color: var(--yellow-2);
				transform: translateY(0.1rem) scaleX(1.4);
			}

			span,
			strong {
				scale: 0.9 1;
			}

			span path {
				transform: translateX(0);
				fill: var(--yellow-2);
			}
		}

		span,
		strong {
			// font-weight: 700;
			transform: skewX(15deg);
			transition: scale var(--duration) var(--transition);
		}

		span {
			width: 1em;
			position: relative;
		}
	}

	svg {
		height: 0.875em;

		path {
			transition: transform var(--duration) var(--transition);

			&:first-child {
				--time: var(--duration);
				transform: translateX(30%);
			}

			&:last-child {
				--time: 0ms;
				transform: translateX(-30%);
			}
		}
	}

	:global([data-motion='no-preference'] .btn) {
		&:focus-visible,
		&:hover {
			path {
				animation: color-pulse calc(3 * var(--duration)) infinite
					calc(-1 * var(--time, var(--duration) / 2));
			}
		}
	}

	@keyframes color-pulse {
		0% {
			fill: currentColor;
		}
		40% {
			fill: var(--yellow-2);
		}
		100% {
			fill: currentColor;
		}
	}
</style>
