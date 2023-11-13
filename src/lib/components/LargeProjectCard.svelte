<script lang="ts">
	import { technologyMap } from '$lib/utils/client/technology-map';
	import Button from './Button.svelte';
	import CondtionalLink from './CondtionalLink.svelte';

	type Technology = keyof typeof technologyMap;
	export let technologies: Technology[] = [];
	export let href: string;
</script>

<article>
	<slot name="image"><img src="" alt="Empty Project Card" /></slot>
	<div class="content">
		<h1><a {href}><slot name="title">Project Title</slot></a></h1>
		<div class="languages" style={`--columns: ${technologies.length}`}>
			{#each technologies as technology}
				{#if !technologyMap[technology]}
					<span class="error">Unknown technology: {technology}</span>
				{:else}
					<CondtionalLink
						href={technologyMap[technology].href}
						target="_blank"
						rel="noopener noreferrer"
						fallback="span"
					>
						<svelte:component this={technologyMap[technology].component} />
						<small>{technologyMap[technology].name}</small>
					</CondtionalLink>
				{/if}
			{/each}
		</div>
		<small class="published"><slot name="published">Published on...</slot></small>
		<p><slot name="description">Project description</slot></p>
	</div>
	<Button {href}>Read More</Button>
</article>

<style lang="scss">
	article {
		display: grid;
		background-color: var(--card);
		border-radius: calc(var(--border-radius) + 1rem);
		padding: 1rem 2rem 1rem 1rem;
		gap: 1rem;
		text-align: center;

		:global(.btn) {
			place-self: end;
			margin-bottom: 1rem;
		}
	}

	h1 {
		font-size: 1.75em;
		font-weight: 700;
		text-wrap: balance;
	}

	.published {
		color: var(--hover-inverse);
	}

	.content {
		display: grid;
		place-content: start;
		gap: 1rem 3rem;

		p {
			grid-column: 1 / -1;
			text-wrap: balance;
		}
	}

	.languages {
		columns: var(--columns, 3);
		column-rule: 1px solid var(--text);
		margin: auto;

		:global(a),
		:global(span) {
			display: grid;
			text-align: center;
		}

		:global(svg) {
			margin: auto;
			height: 2rem;
		}

		small {
			font-size: 0.5em;
		}
	}

	@media only screen and (width > 40rem) {
		article {
			grid-template-columns: 1fr 2fr;

			:global(.lazy-img) {
				grid-row: span 2;
			}
		}
	}

	@media only screen and (width > 60rem) {
		.content {
			text-align: initial;
			margin-top: 1rem;
			grid-template-columns: 1fr auto;
		}
	}
</style>
