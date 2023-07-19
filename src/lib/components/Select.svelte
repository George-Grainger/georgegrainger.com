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
	div,
	button {
		height: 100%;
	}

	button,
	ul :global(li) {
		display: grid;
		grid-template-columns: auto minmax(max-content, var(--_svg-size));
		gap: calc(2 * var(--_size));
		align-items: center;

		text-align: left;
		background-color: var(--inverse);
		padding: calc(0.5 * var(--_size)) var(--_size);
		border: var(--_border-size) solid var(--text);
		width: 100%;
		cursor: pointer;

		:global(svg) {
			height: var(--_svg-size);
		}

		&:hover {
			background-color: var(--hover);
		}
	}

	div {
		--_drop-duration: calc(var(--duration) * 0.67);
		--_size: 0.5em;
		--_svg-size: 2em;
		--_border-size: 0.2em;

		isolation: isolate;
	}

	button {
		border-radius: var(--border-radius);
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

	ul :global(li) {
		border-block: none;

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

	ul {
		height: 0;
		translate: 0 calc(0.5 * var(--_size));
		transition: translate var(--_drop-duration) var(--transition),
			opacity var(--_drop-duration) var(--transition);
		z-index: -1;
		position: relative;
	}

	[aria-expanded='false'] + ul {
		translate: 0 calc(-2 * var(--_size));
		opacity: 0;
		pointer-events: none;
	}
</style>
