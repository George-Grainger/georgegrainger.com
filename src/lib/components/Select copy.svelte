<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher } from 'svelte';
	import { clickoutside } from '$lib/hooks/use-click-outide';
	import Option from './Option.svelte';

	export let id: string;
	export let referBy: string;
	export let updates: string;

	let loading = 'Loading...';
	let expanded = false;
	let btn: HTMLButtonElement;
	let ul: HTMLElement;
	const dispatch = createEventDispatcher();

	function toggleExpanded() {
		// Need to handle keyboard navigation
		expanded = !expanded;
	}

	function handleChange(e: MouseEvent | KeyboardEvent) {
		const el = e.target as HTMLElement;
		updates = el.closest('li')?.getAttribute('data-value') ?? '';
	}

	$: if (browser && btn) {
		// Handle visible option switch
		const current = ul?.querySelector(`[data-value=${updates}]`);
		btn.innerHTML = current?.innerHTML || loading;

		// Handle aria-checked
		const previous = current?.parentElement?.querySelector('[aria-checked="true"]');
		previous?.setAttribute('aria-checked', 'false');
		current?.setAttribute('aria-checked', 'true');

		dispatch('change', {
			from: previous?.getAttribute('data-value'),
			to: current?.getAttribute('data-value')
		});
	}
</script>

<div use:clickoutside={{ enabled: expanded, callback: toggleExpanded }}>
	<button
		type="button"
		aria-haspopup="menu"
		aria-controls={id}
		aria-label={`Current ${referBy}: ${updates}`}
		aria-expanded={expanded}
		tabindex="0"
		bind:this={btn}
		on:click={toggleExpanded}
		on:keypress={toggleExpanded}
	>
		{loading}
	</button>
	<ul
		{id}
		role="menu"
		aria-label={`${referBy} Options`}
		tabindex="-1"
		bind:this={ul}
		on:click={handleChange}
		on:keypress={handleChange}
	>
		<slot>
			<Option value="placeholder" />
		</slot>
	</ul>
</div>

<style lang="scss">
	div {
		--_drop-duration: var(--duration);
	}

	button,
	ul :global(li) {
		display: grid;
		grid-template-columns: auto minmax(max-content, var(--svg-size));
		gap: calc(2 * var(--_size));
		align-items: center;

		text-align: left;
		background-color: var(--inverse);
		padding: calc(0.5 * var(--_size)) var(--_size);
		width: 100%;
		cursor: pointer;

		:global(svg) {
			height: var(--_svg-size);
		}

		&:hover {
			background-color: var(--hover);
		}
	}

	button {
		border-radius: var(--border-radius);
		border: var(--_border-size) solid var(--text);

		&::before,
		&::after {
			content: '';
			grid-row: 1;
			grid-column: -2;
			border-inline: var(--_size) solid transparent;
			justify-self: center;
			transition: opacity var(--_drop-duration) var(--transition);
		}

		&::before {
			translate: 0 -0.33em;
			border-bottom: var(--_size) solid currentColor;
		}

		&::after {
			translate: 0 0.33em;
			border-top: var(--_size) solid currentColor;
		}

		&[aria-expanded='false']::before,
		&[aria-expanded='true']::after {
			opacity: 0.35;
		}
	}

	ul {
		height: inherit;
		position: absolute;
		inset: auto var(--_size) calc(-4 * var(--_size));
		z-index: 1;
		overflow: hidden;
		transition: translate var(--_drop-duration) var(--transition),
			opacity var(--_drop-duration) var(--transition);

		border-radius: var(--border-radius);
		border: var(--_border-size) solid var(--text);
	}

	[aria-expanded='false'] + ul {
		opacity: 0;
		pointer-events: none;
	}

	[aria-expanded='true'] + ul {
		translate: 0 calc(-5 * var(--_size));
	}

	@media only screen and (width <= 40rem) {
		div:has([aria-expanded='true'])::before {
			content: '';
			position: sticky;
			inset: 0;
			background-color: var(--black);
			opacity: 0.4;
			pointer-events: none;
		}
	}

	@media only screen and (width > 40rem) {
		ul {
			position: relative;
			inset: auto;
			z-index: -1;
			height: 0;
			border: none;
			overflow: initial;

			:global(li) {
				border-inline: var(--_border-size) solid var(--text);

				&:first-of-type {
					border-top: var(--_border-size) solid;
					border-top-left-radius: var(--border-radius);
					border-top-right-radius: var(--border-radius);
				}

				&:last-of-type {
					border-bottom: var(--_border-size) solid;
					border-bottom-left-radius: var(--border-radius);
					border-bottom-right-radius: var(--border-radius);
				}
			}
		}

		[aria-expanded='true'] + ul {
			translate: 0 var(--_size);
		}
	}
</style>
