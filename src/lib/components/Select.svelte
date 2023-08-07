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

	function handleKeyPress(e: KeyboardEvent) {
		console.log(e);
	}

	function handleChange(e: MouseEvent | KeyboardEvent) {
		const el = e.target as HTMLElement;
		updates = el.closest('li')?.getAttribute('data-value') ?? '';
		expanded = false;
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

<div data-wraps={id} use:clickoutside={{ enabled: expanded, callback: toggleExpanded }}>
	<button
		type="button"
		aria-haspopup="menu"
		aria-controls={id}
		aria-label={`Current ${referBy}: ${updates}`}
		aria-expanded={expanded}
		tabindex="0"
		bind:this={btn}
		on:click={toggleExpanded}
		on:keypress={handleKeyPress}
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
		--_drop-duration: calc(var(--duration) * 0.67);
		--_arrow-size: 0.5em;

		isolation: isolate;
		height: 100%;
	}

	button,
	ul :global(li) {
		display: grid;
		grid-template-columns: auto minmax(max-content, var(--_svg-size, 1.5em));
		align-items: center;

		text-align: left;
		background-color: var(--inverse);
		padding: calc(0.5 * var(--_size)) var(--_size);
		border: var(--_border-size) solid currentColor;
		width: 100%;
		cursor: pointer;

		&:hover {
			background-color: var(--hover);
		}
	}

	button {
		border-radius: var(--border-radius);

		&::before,
		&::after {
			content: '';
			grid-row: 1;
			grid-column: -2;
			border-inline: var(--_arrow-size) solid transparent;
			justify-self: center;
			transition: opacity var(--_drop-duration) var(--transition);
		}

		&::before {
			translate: 0 -0.3em;
			border-bottom: var(--_arrow-size) solid currentColor;
		}

		&::after {
			translate: 0 0.3em;
			border-top: var(--_arrow-size) solid currentColor;
		}

		&[aria-expanded='false']::before,
		&[aria-expanded='true']::after {
			opacity: 0.35;
		}
	}

	ul {
		transition: translate var(--_drop-duration) var(--transition),
			opacity var(--_drop-duration) var(--transition);
		z-index: -1;
		position: absolute;

		:global(li) {
			position: relative;
			border-block: none;
			margin-block: -1px;
			padding-block: 0.5em;

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

		:global(li :last-child) {
			place-self: center;
		}
	}

	[aria-expanded='false'] + ul {
		translate: 0 calc(2 * var(--_size));
		opacity: 0;
		pointer-events: none;
	}

	@media only screen and (width <= 40rem) {
		ul {
			inset: auto 1rem 1rem;

			:global(li) {
				justify-content: start;
				padding-inline: 0.75em;
				gap: 0.75em;
			}

			:global(li[aria-checked='true']::after) {
				content: '✔';
				position: absolute;
				right: 0.75em;
			}

			:global(li span) {
				order: 1;
			}
		}
	}

	@media only screen and (width > 40rem) {
		div {
			font-size: var(--_select-fs);
		}

		button,
		ul :global(li) {
			gap: calc(2 * var(--_size));
		}

		ul {
			position: relative;
			inset: 0;
			translate: 0 0.35em;
			height: 0;
		}

		[aria-expanded='false'] + ul {
			translate: 0 calc(-2 * var(--_size));
		}
	}
</style>
