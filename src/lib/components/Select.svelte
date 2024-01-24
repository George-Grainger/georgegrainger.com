<script lang="ts">
	import { browser } from '$app/environment';
	import { clickoutside } from '$lib/hooks/use-click-outide';
	import { afterUpdate, createEventDispatcher, onMount } from 'svelte';
	import Option from './Option.svelte';

	export let id: string;
	export let referBy: string;
	export let selected = '';

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
			const current = ul?.querySelector(`[data-value=${selected}]`) as HTMLElement;
			current?.focus();
		} else {
			btn.focus();
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		const { key, altKey } = e;
		const current = ul?.querySelector(`[data-value=${selected}]`) as HTMLElement;

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
				e.preventDefault();
				next = current?.nextElementSibling as HTMLElement;
				if (altKey) {
					next = ul.lastElementChild as HTMLElement;
				}
				break;
			case 'ArrowUp':
				if (altKey) {
					setExpanded(false);
					break;
				}
			/* falls through */
			case 'ArrowLeft':
				e.preventDefault();
				next = current?.previousElementSibling as HTMLElement;
				if (altKey) {
					next = ul.firstElementChild as HTMLElement;
				}
				break;
		}

		if (next) {
			expanded && next.focus();
			doUpdate(next);
		}
	}

	function handleClick(e: MouseEvent) {
		const transitionDelay = browser && window?.matchMedia('(width <= 40rem)').matches ? 150 : 0;
		setTimeout(() => setExpanded(false), transitionDelay);

		const el = e.target as HTMLElement;
		const next = el.closest('li');

		if (next) {
			doUpdate(next);
		}
	}

	function doUpdate(next: HTMLElement) {
		const previous = ul.querySelector('[aria-checked="true"]');
		previous?.setAttribute('aria-checked', 'false');
		next?.setAttribute('aria-checked', 'true');
		selected = next?.getAttribute('data-value') || '';

		if (previous && next !== previous) {
			dispatch('change', {
				from: previous?.getAttribute('data-value'),
				to: next?.getAttribute('data-value')
			});
		}
	}

	onMount(() => {
		doUpdate(ul?.querySelector(`[data-value=${selected}]`) as HTMLElement);
	});

	afterUpdate(() => {
		const current = ul?.querySelector(`[data-value=${selected}]`) as HTMLElement;
		if (current) {
			btn.innerHTML = current.innerHTML;
		}
	});
</script>

<div class:expanded use:clickoutside={{ enabled: expanded, callback: toggleExpanded }}>
	<button
		type="button"
		aria-haspopup="menu"
		aria-controls={id}
		aria-label={`Current ${referBy}: ${selected}`}
		aria-expanded={expanded}
		tabindex="0"
		bind:this={btn}
		on:click={toggleExpanded}
		on:keydown={handleKeyDown}
	>
		<div class="loading-spinner" />
	</button>
	<ul
		{id}
		role="menu"
		aria-label={`${referBy} Options`}
		tabindex="-1"
		bind:this={ul}
		on:click={handleClick}
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
		display: grid;
		grid-template-rows: 1fr 0px;

		&::before {
			position: fixed;
			inset: 0;
			pointer-events: none;
			background-color: var(--black);
			opacity: 0;
			transition: opacity var(--transition) var(--_drop-duration);
			z-index: 1;
		}

		:global(svg) {
			height: var(--_svg-height, 1.5em);
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
		cursor: pointer;

		&:hover {
			background-color: var(--hover);
		}
	}

	button {
		border-radius: var(--border-radius);
		line-height: 1;
		min-height: 2.25em;
		min-width: 3em;
		position: relative;

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

	.loading-spinner {
		position: relative;
		justify-self: center;
		height: 1.25em;
		aspect-ratio: 1;
		border: 0.25em solid var(--text);
		border-right-color: transparent;
		border-radius: 100vmax;
		animation: rotate-forever calc(2 * var(--duration)) linear infinite;
	}

	ul {
		transition: translate var(--_drop-duration) var(--transition),
			opacity var(--_drop-duration) var(--transition);
		z-index: -1;

		:global(li) {
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
				transition: scale var(--transition) var(--duration);
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

	@media only screen and (max-width: 39.9375rem) {
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

	@media only screen and (min-width: 40rem) {
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
		}

		[aria-expanded='false'] + ul {
			translate: 0 -1em;
		}
	}

	@keyframes rotate-forever {
		to {
			transform: rotate(360deg);
		}
	}
</style>
