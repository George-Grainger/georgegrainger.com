<script lang="ts">
	import Button from './Button.svelte';
	import { technologyMap } from '$lib/utils/client/technology-map';
	import CondtionalLink from './CondtionalLink.svelte';
	import { beforeUpdate, onMount } from 'svelte';
	import { getContext } from 'svelte/internal';

	type Technology = keyof typeof technologyMap;
	export let technologies: Technology[] = [];
	export let href: string;

	const { t } = getContext('translations');

	let card: HTMLElement;
	let preload = true;

	// Prevent CLS when calculating margins
	beforeUpdate(() => {
		preload = false;
	});

	onMount(() => {
		const articleHeight = card?.clientHeight;
		const frontHeight = (card?.firstChild as HTMLElement).clientHeight;
		card?.style.setProperty('margin-bottom', `${frontHeight - articleHeight}px`);
	});

	const handleMouseOver = () => {
		// Remove translate to prevent weirdness on pointer down
		card.style.removeProperty('translate');

		// Get list of all cards on parent
		let cards = Array.from(card.parentElement?.children || []) as HTMLElement[];
		cards = cards.filter((c) => c.tagName === 'ARTICLE');
		let cardIndex = cards.indexOf(card);

		// Get all cards in same column as current one
		const perRow = getComputedStyle(card.parentElement as HTMLElement)
			.getPropertyValue('grid-template-columns')
			.split(' ').length;
		const col = cardIndex % perRow;
		cards = cards.filter((_, i) => i % perRow == col);
		cardIndex = cards.indexOf(card);

		// Offset cards below
		const cardsBefore = cards.slice(0, cardIndex);
		const mid = (perRow - 1) / 2;
		if (col === Math.floor(mid) % perRow || col === Math.ceil(mid) % perRow) {
			cardsBefore.push(document.getElementById('project-title') as HTMLElement);
		}
		cardsBefore.forEach((c) => c.style.setProperty('translate', '0 -3rem'));

		// Offset cards above
		const cardsAfter = cards.slice(cardIndex + 1);
		const upOffset = Number(card.style.getPropertyValue('margin-bottom').slice(0, -2));
		const downOffset = `${-upOffset}px`;
		cardsAfter.forEach((c) => c.style.setProperty('translate', `0 ${downOffset}`));

		// Scroll into view on mobile
		if (matchMedia('(pointer: coarse)').matches) {
			card.scrollIntoView(true);
		}
	};

	const handleMouseOut = () => {
		const cards = Array.from(card.parentElement?.children || []) as HTMLElement[];
		cards.push(document.getElementById('project-title') as HTMLElement);
		cards.forEach((c) => c.style.removeProperty('translate'));
	};
</script>

<article
	class:preload
	bind:this={card}
	on:mouseenter={handleMouseOver}
	on:mouseleave={handleMouseOut}
	on:focusin={handleMouseOver}
	on:focusout={handleMouseOut}
>
	<header>
		<slot name="image"><img src="" alt="Empty Project Card" /></slot>
		<h1><slot name="title">Project Title</slot></h1>
		<h2><slot name="subtitle">Project Subtitle / short description</slot></h2>
	</header>
	<section>
		<strong aria-hidden="true"><slot name="title">Title</slot></strong>
		<p><slot name="description">Project description</slot></p>
		<div class="languages" style={`--columns: ${technologies.length}`}>
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
						<small>{technologyMap[technology].name}</small>
					</CondtionalLink>
				{/if}
			{/each}
		</div>
		<Button {href}>{$t('home.view-details')}</Button>
	</section>
</article>

<style lang="scss">
	article {
		display: grid;
		position: relative;
		isolation: isolate;
		width: fit-content;
		contain: layout;
		transition: translate var(--duration) var(--transition);

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			z-index: -1;
			transform: scale(0.9, 0.33);
			transform-origin: 50% 20%;
			border-radius: var(--border-radius);
			background-color: var(--card);
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
			top: -1x;
			font-weight: 600;
			color: var(--white);
			background-color: var(--black);
			padding: 0.5em 0.5em 0.75em;
			clip-path: polygon(100% 0%, 100% 100%, 50% 85%, 0 100%, 0 0);
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
				pointer-events: autosean;

				:global(a) {
					pointer-events: auto;
				}
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

		:global(img),
		:global(svg) {
			border-radius: var(--border-radius);
			object-fit: cover;
			aspect-ratio: 5 / 6;
		}

		h1,
		h2 {
			line-height: 1;
			margin-inline: 0.25em;
		}

		h1 {
			font-weight: 700;
		}

		h2 {
			font-size: 0.75em;
			font-weight: 600;
			color: var(--hover-inverse);
		}
	}

	.preload section {
		height: 0;
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
		transform: translateY(5%);
		pointer-events: none;

		:global(a) {
			pointer-events: none;
		}

		strong {
			font-size: 1.5em;
		}

		p {
			font-size: 0.9em;
			width: 110%;
			text-wrap: balance;
		}

		:global(button) {
			font-size: 1.25em;
		}
	}

	.languages {
		columns: var(--columns, 3);
		column-rule: 1px solid var(--text);

		small {
			display: block;
			font-weight: 600;
			font-variant-caps: small-caps;
			color: var(--hover-inverse);
			font-size: 0.7em;
		}

		:global(a) {
			outline-style: none;

			&:hover :global(svg) {
				transform: scale(1.2);
			}

			&:focus-visible :global(small) {
				outline: 0.1rem solid var(--outline);
				outline-offset: 0.15rem;
				border-radius: calc(0.5 * var(--border-radius));
			}
		}

		:global(svg) {
			--a-duration: calc(2.5 * var(--duration));
			width: var(--size, 1em);
			font-size: 2em;
		}

		:global(path) {
			transform-origin: center;
		}
	}

	:global([data-motion='no-preference']) {
		article {
			&:focus-within :global(path),
			&:hover :global(path) {
				stroke-dasharray: 0 var(--_dash-array, 1600);
				animation: border-move var(--a-duration) var(--a-delay, 0ms) linear forwards,
					fill-icon var(--a-duration) calc(1.25 * var(--a-duration) + var(--a-delay, 0ms)) linear
						forwards;
			}

			&::before,
			&::after {
				transition: transform var(--duration) var(--transition);
			}
		}

		header {
			transition: transform var(--duration) var(--transition);

			h1 {
				transition: opacity var(--duration) var(--transition);
			}
		}

		section {
			transition: transform var(--duration) var(--transition),
				opacity var(--duration) var(--transition);
		}

		.languages {
			:global(svg) {
				transition: transform var(--duration) var(--transition);
			}

			:global(path) {
				fill-opacity: 0;

				&:not([stroke-width]) {
					stroke-width: 0.15em;
				}
			}

			:global(:nth-child(2) path) {
				--a-delay: calc(0.4 * var(--a-duration));
			}

			:global(:nth-child(3) path) {
				--a-delay: calc(0.8 * var(--a-duration));
			}
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
