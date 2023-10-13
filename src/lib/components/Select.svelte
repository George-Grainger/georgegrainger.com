<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher } from 'svelte';
	import { clickoutside } from '$lib/hooks/use-click-outide';
	import Option from './Option.svelte';

	export let id: string;
	export let referBy: string;
	export let updates: string;

	let expanded = false;
	let btn: HTMLButtonElement;
	let ul: HTMLElement;
	const dispatch = createEventDispatcher();

	function toggleExpanded() {
		setExpanded(!expanded);
	}

	function setExpanded(value: boolean) {
		expanded = value;
		if (expanded) {
			const current = ul?.querySelector(`[data-value=${updates}]`) as HTMLElement;
			current?.focus();
		} else {
			btn.focus();
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		const { key, altKey } = e;
		const current = ul?.querySelector(`[data-value=${updates}]`) as HTMLElement;
		let next: HTMLElement | undefined;

		switch (key) {
			case 'Escape':
			case 'Tab':
				setExpanded(false);
				break;
			case 'Enter':
				btn.focus();
				break;
			case 'ArrowDown':
				if (altKey) {
					setExpanded(true);
					break;
				}
			/* falls through */
			case 'ArrowRight':
				next = current?.nextElementSibling as HTMLElement;
				if (altKey) {
					next = ul.lastElementChild as HTMLElement;
					e.preventDefault();
				}
				break;
			case 'ArrowUp':
				if (altKey) {
					setExpanded(false);
					break;
				}
			/* falls through */
			case 'ArrowLeft':
				next = current?.previousElementSibling as HTMLElement;
				if (altKey) {
					next = ul.firstElementChild as HTMLElement;
					e.preventDefault();
				}
				break;
		}

		if (next) {
			updates = next.getAttribute('data-value') ?? '';
			expanded && next.focus();
		}
	}

	function handleChange(e: MouseEvent | KeyboardEvent) {
		const el = e.target as HTMLElement;
		const transitionDelay = browser && window?.matchMedia('(width <= 40rem)').matches ? 100 : 0;
		setTimeout(() => setExpanded(false), transitionDelay);
		updates = el.closest('li')?.getAttribute('data-value') ?? '';
	}

	$: if (browser && btn) {
		// Handle visible option switch
		const current = ul?.querySelector(`[data-value=${updates}]`);

		if (current) {
			btn.innerHTML = current.innerHTML;
		}

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

<div class:expanded use:clickoutside={{ enabled: expanded, callback: toggleExpanded }}>
	<button
		type="button"
		aria-haspopup="menu"
		aria-controls={id}
		aria-label={`Current ${referBy}: ${updates}`}
		aria-expanded={expanded}
		tabindex="0"
		bind:this={btn}
		on:click={toggleExpanded}
		on:keydown={handleKeyDown}
	/>
	<ul
		{id}
		role="menu"
		aria-label={`${referBy} Options`}
		tabindex="-1"
		bind:this={ul}
		on:click={handleChange}
		on:keydown={handleKeyDown}
	>
		<slot>
			<Option value="placeholder" />
		</slot>
	</ul>
</div>

<style lang="scss">
	div {
		--_drop-duration: calc(var(--duration) * 0.67);
		--_arrow-size: 0.4em;

		&::before {
			position: fixed;
			inset: 0;
			pointer-events: none;
			background-color: var(--black);
			opacity: 0;
			transition: opacity var(--transition) var(--_drop-duration);
			z-index: 1;
		}
	}

	button,
	ul :global(li) {
		display: grid;
		grid-template-columns: auto minmax(max-content, 1.5em);
		align-items: center;

		text-align: left;
		background-color: var(--inverse);
		padding: var(--_size);
		border: var(--_border-size) solid currentColor;
		width: 100%;
		cursor: pointer;

		&:hover {
			background-color: var(--hover);
		}
	}

	button {
		border-radius: var(--border-radius);
		line-height: 1;

		&:empty {
			height: 2.25em;
			min-width: 3em;
		}

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
			translate: 0 -0.25em;
			border-bottom: var(--_arrow-size) solid currentColor;
		}

		&::after {
			translate: 0 0.25em;
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
		position: relative;

		:global(li) {
			position: relative;
			border-block: none;
			margin-block: -1px;
			padding-block: 0.25em;

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

			&:focus-visible {
				outline-offset: calc(-1.75 * var(--_border-size));
			}

			:global(:last-child) {
				place-self: center;
			}

			&::before,
			&::after {
				height: 0.75em;
				width: 0.75em;
				border-radius: 100vmax;
				outline: solid var(--text) 0.125em;
				position: absolute;
				right: 0.75em;
			}

			&::before {
				background-color: var(--text);
				transition: var(--transition) var(--duration);
				scale: 0;
			}
		}

		:global(li[aria-checked='true']) {
			&::before {
				scale: 1;
			}

			&::after {
				border: 0.175em solid var(--inverse);
			}
		}
	}

	[aria-expanded='false'] + ul {
		opacity: 0;
		pointer-events: none;
	}

	@media only screen and (width <= 40rem) {
		div::before {
			content: '';
		}

		.expanded::before {
			opacity: 0.85;
		}

		ul {
			z-index: 1;
			position: fixed;
			inset: auto 0.5rem 0.5rem;

			:global(li) {
				justify-content: start;
				padding: 0.675em 2.25em 0.675em 0.5em;
				gap: 1em;

				:global(span) {
					order: 1;
				}

				&::before,
				&::after {
					content: '';
				}
			}
		}
	}

	@media only screen and (width > 40rem) {
		div {
			font-size: var(--_select-fs);
		}

		button,
		ul :global(li) {
			gap: calc(4 * var(--_size));
		}

		button:empty {
			height: 2em;
		}

		ul {
			translate: 0 0.35em;
			height: 0;
		}

		[aria-expanded='false'] + ul {
			translate: 0 -1em;
		}
	}
</style>
