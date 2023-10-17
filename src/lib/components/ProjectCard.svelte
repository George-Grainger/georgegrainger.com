<script lang="ts">
	import Button from './Button.svelte';
	import { technologyMap } from '../utils/technology-map';
	import CondtionalLink from './CondtionalLink.svelte';

	type Technology = keyof typeof technologyMap;
	export let technologies: Technology[] = [];
</script>

<article>
	<header>
		<slot name="image"><img src="" alt="Empty Project Card" /></slot>
		<h1><slot name="title">Project Title</slot></h1>
		<h2><slot name="subtitle">Project Subtitle / short description</slot></h2>
	</header>
	<section>
		<strong aria-hidden="true"><slot name="title">Title</slot></strong>
		<p><slot name="description">Project description</slot></p>
		<div class="languages">
			{#each technologies as technology}
				{#if !technologyMap[technology]}
					<span class="error">Unknown technology: {technology}</span>
				{:else}
					<CondtionalLink
						href={technologyMap[technology].href}
						target="_blank"
						rel="noopener noreferrer"
					>
						<svelte:component this={technologyMap[technology].component} />
						<strong>{technologyMap[technology].name}</strong>
					</CondtionalLink>
				{/if}
			{/each}
		</div>
		<Button>View Details</Button>
	</section>
</article>

<style lang="scss">
	article {
		display: grid;
		position: relative;
		isolation: isolate;
		width: fit-content;
		margin: auto;
		transition: transform var(--duration) var(--transition);

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			z-index: -1;
			transform: scale(0.9, 0.33);
			transform-origin: 50% 20%;
			border-radius: var(--border-radius);
			background-color: var(--card);
			transition: transform var(--duration) var(--transition);
		}

		&:focus-within::before,
		&:hover::before {
			transform: scale(1.2, 1);
		}

		&::after {
			counter-increment: card-num;
			content: counter(card-num);
			position: absolute;
			right: 10%;
			font-weight: 600;
			color: var(--white);
			background-color: var(--black);
			padding: 0.5em 0.5em 0.75em;
			clip-path: polygon(100% 0%, 100% 100%, 50% 85%, 0 100%, 0 0);
			transition: transform var(--duration) var(--transition);
		}

		&:hover::after,
		&:focus-within::after {
			transform: translateX(100%);
		}

		&:focus-within,
		&:hover {
			header {
				transform: translateY(-33%) scale(0.6);

				h1,
				h2 {
					opacity: 0;
				}
			}

			section {
				opacity: 1;
				transform: translateY(0);
				pointer-events: auto;
				transition: transform var(--duration) var(--transition),
					opacity var(--duration) var(--transition);
			}
		}
	}

	header,
	section {
		grid-area: -1/-1;
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-bottom: auto;
		transition: transform var(--duration) var(--transition);

		img,
		:global(svg) {
			border-radius: var(--border-radius);
			object-fit: cover;
			aspect-ratio: 5 / 6;
		}

		h1,
		h2 {
			line-height: 1;
			margin-inline: 0.25em;
			transition: opacity var(--duration) var(--transition);
		}

		h1 {
			font-weight: 700;
		}

		h2 {
			font-size: 0.75em;
			font-weight: 600;
			color: var(--hover-inverse);
			text-wrap: balance;
		}
	}

	section {
		display: grid;
		place-items: center;
		text-align: center;
		z-index: -1;
		gap: 1em;
		margin-top: 60%;
		opacity: 0;
		padding-bottom: 1em;
		pointer-events: none;
		transform: translateY(5%);

		strong {
			font-weight: 700;
			font-size: 1.5em;
		}

		p {
			font-size: 0.9em;
			width: 110%;
			text-wrap: balance;
		}
	}

	.languages {
		columns: var(--columns, 3);
		column-rule: 1px solid var(--text);

		strong {
			display: block;
			font-variant-caps: small-caps;
			color: var(--hover-black);
			font-size: 0.6em;
		}

		:global(a) {
			outline: none;

			:global(strong) {
				text-decoration: underline;
			}

			&:hover :global(path) {
				transform: scale(1.2);
			}
		}

		:global(svg) {
			--a-duration: calc(3 * var(--duration));
			width: var(--size, 0.75em);
			overflow: visible;
			font-size: 3em;
		}

		:global(path) {
			transform-origin: center;
		}
	}

	:global([data-motion='no-preference']) {
		article:focus-within :global(path),
		article:hover :global(path) {
			stroke-dasharray: 0 var(--_dash-array, 1600);
			animation: border-move var(--a-duration) var(--a-delay, 0ms) linear forwards,
				fill-icon var(--a-duration) calc(1.25 * var(--a-duration) + var(--a-delay, 0ms)) linear
					forwards;
		}

		.languages :global(path) {
			fill-opacity: 0;
			transition: transform var(--duration) var(--transition);

			&:not([stroke-width]) {
				stroke-width: 0.15em;
			}
		}

		.languages :global(:nth-child(2) path) {
			--a-delay: calc(0.4 * var(--a-duration));
		}

		.languages :global(:nth-child(3) path) {
			--a-delay: calc(0.8 * var(--a-duration));
		}
	}

	@keyframes border-move {
		0% {
			stroke-dasharray: 0 var(--_dash-array, 1600);
		}
		100% {
			stroke-dasharray: var(--_dash-array, 1600) var(--_dash-array, 1600);
		}
	}

	@keyframes fill-icon {
		0% {
			fill-opacity: 0;
		}
		100% {
			fill-opacity: 1;
		}
	}
</style>
