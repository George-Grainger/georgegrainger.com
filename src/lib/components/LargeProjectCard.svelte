<script lang="ts">
	import { t } from '$lib/translations';
	import { tagMap } from '$lib/utils/client/tag-map';
	import Button from './Button.svelte';
	import CondtionalLink from './CondtionalLink.svelte';

	type Tag = keyof typeof tagMap;
	export let tags: Tag[] = [];
	export let href: string;
</script>

<article>
	<a class="project-image" {href}>
		<slot name="image"><img src="" alt="Empty Project Card" /></slot>
	</a>
	<div class="content">
		<h1><a {href}><slot name="title">Project Title</slot></a></h1>
		<div class="languages" style={`--columns: ${tags.length}`}>
			{#each tags as tag}
				{#if !tagMap[tag]}
					<span class="text-error">Unknown tag: {tag}</span>
				{:else}
					<CondtionalLink
						href={tagMap[tag].href}
						target="_blank"
						rel="noopener noreferrer"
						fallback="span"
					>
						<svelte:component this={tagMap[tag].component} />
						<small>{tagMap[tag].name}</small>
					</CondtionalLink>
				{/if}
			{/each}
		</div>
		<small class="published"><slot name="published">Published on...</slot></small>
		<p><slot name="description">Project description</slot></p>
	</div>
	<Button {href}>{$t('projects.read-more')}</Button>
</article>

<style lang="scss">
	article {
		display: grid;
		background-color: var(--card);
		border-radius: calc(var(--border-radius) + 1rem);
		padding: 1rem;
		gap: 3rem;
		text-align: center;

		:global(.btn) {
			place-self: end;
			margin-bottom: 1rem;
		}

		:global(.lazy-img) {
			aspect-ratio: 3 / 2;
		}
	}

	h1 {
		font-size: 1.5em;
		font-weight: 700;
		text-wrap: balance;
	}

	.published {
		color: var(--hover-inverse);
	}

	.content {
		display: grid;
		place-content: start;
		gap: 1rem 2rem;

		p {
			grid-column: 1 / -1;
			text-wrap: balance;
		}
	}

	.languages {
		display: flex;
		margin: auto;
		white-space: nowrap;
		gap: 2rem;

		:global(a),
		:global(span) {
			display: grid;
			position: relative;
			text-align: center;
		}

		:global(a + a::before),
		:global(a + span::before),
		:global(span + a::before),
		:global(span + span::before) {
			content: '';
			position: absolute;
			width: 1px;
			height: 100%;
			left: -1rem;
			background-color: var(--text);
		}

		:global(svg) {
			margin: auto;
			height: 1.75rem;
			stroke-width: var(--_final-stroke);
		}

		small {
			font-size: 0.5em;
		}
	}

	@media only screen and (min-width: 60rem) {
		article {
			grid-template-columns: 3fr 4fr;
			padding-right: 1.5rem;

			a:first-child {
				grid-row: span 2;
			}

			:global(.lazy-img) {
				aspect-ratio: initial;
			}
		}

		.content {
			text-align: initial;
			margin-top: 1rem;
			grid-template-columns: auto 1fr;
		}

		.languages {
			margin-right: 0;
		}
	}
</style>
