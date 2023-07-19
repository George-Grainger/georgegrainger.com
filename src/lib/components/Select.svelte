<script lang="ts">
	import { browser } from '$app/environment';
	import { clickoutside } from '$lib/hooks/use-click-outide';
	import { motion } from '$lib/stores/motion';

	const LOADING = 'Loading...';

	let expanded = false;
	function toggleExpanded() {
		// Need to handle keyboard navigation
		expanded = !expanded;
	}

	function handleChange(e: MouseEvent | KeyboardEvent) {
		const el = e.target as HTMLElement;
		$motion = el.id;
	}

	let btn: HTMLButtonElement;
	$: if (browser && btn) {
		// Handle visible option switch
		const current = document.getElementById($motion);
		btn.innerHTML = current?.innerText || LOADING;

		// Handle aria-checked
		const previous = current?.parentElement?.querySelector('[aria-checked="true"]');
		previous?.setAttribute('aria-checked', 'false');
		current?.setAttribute('aria-checked', 'true');
	}
</script>

<div use:clickoutside={{ enabled: expanded, callback: toggleExpanded }}>
	<button
		type="button"
		aria-haspopup="menu"
		aria-controls="language-menu"
		aria-label="Current Language: English"
		aria-expanded={expanded}
		tabindex="0"
		bind:this={btn}
		on:click={toggleExpanded}
		on:keypress={toggleExpanded}
	>
		{LOADING}
	</button>
	<ul
		id="language-menu"
		role="menu"
		aria-label="Language Options"
		tabindex="-1"
		on:click={handleChange}
		on:keypress={handleChange}
	>
		<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
		<li id={motion.REDUCE} role="menuitemradio" aria-checked="false" tabindex="-1">
			Keep Animations
			<svg fill="currentColor" viewBox="0 0 512 512">
				<path
					d="M464 256a208 208 0 1 0-416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1-512 0zm188-109c8-4 17-4 25 1l144 88a24 24 0 0 1 0 41l-144 88c-8 4-17 4-25 0s-12-12-12-21V168c0-9 5-17 12-21z"
				/>
			</svg>
		</li>
		<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
		<li id={motion.NO_PREFERENCE} role="menuitemradio" aria-checked="false" tabindex="-1">
			Reduce Animations
			<svg fill="currentColor" viewBox="0 0 512 512">
				<path
					d="M256 8a248 248 0 1 0 0 496 248 248 0 0 0 0-496zm0 448a200 200 0 1 1 0-400 200 200 0 0 1 0 400zm96-280v160c0 9-7 16-16 16h-48c-9 0-16-7-16-16V176c0-9 7-16 16-16h48c9 0 16 7 16 16zm-112 0v160c0 9-7 16-16 16h-48c-9 0-16-7-16-16V176c0-9 7-16 16-16h48c9 0 16 7 16 16z"
				/>
			</svg>
		</li>
	</ul>
</div>

<style lang="scss">
	div {
		--_drop-duration: var(--duration);

		isolation: isolate;
	}

	button,
	li {
		--_size: 0.5em;
		--_border-size: 0.2em;

		display: grid;
		grid-template-columns: auto 1.5em;
		gap: calc(2 * var(--_size));
		align-items: center;

		text-align: left;
		background-color: var(--inverse);
		padding: calc(0.5 * var(--_size)) var(--_size);
		border: var(--_border-size) solid var(--text);
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
			grid-column: 2;
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

	li {
		border-block: none;

		&:first-of-type {
			border-top: var(--_border-size) solid;
			border-radius: var(--border-radius) var(--border-radius) 0 0;
		}

		&:last-of-type {
			border-bottom: var(--_border-size) solid;
			border-radius: 0 0 var(--border-radius) var(--border-radius);
		}
	}

	[role='menu'] {
		height: 0;
		translate: 0 0.5rem;
		transition: translate var(--_drop-duration) var(--transition),
			opacity var(--_drop-duration) var(--transition);
		z-index: -1;
		position: relative;
	}

	[aria-expanded='false'] + [role='menu'] {
		translate: 0 -1rem;
		opacity: 0;
		pointer-events: none;
	}
</style>
