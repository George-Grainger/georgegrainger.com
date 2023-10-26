<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import Option from '$lib/components/Option.svelte';
	import Select from '$lib/components/Select.svelte';
	import { motion } from '$lib/stores/motion';
	import AnimationIcon from '$lib/assets/svg/AnimationIcon.svelte';
	import FranceFlag from '$lib/assets/svg/flags/FranceFlag.svelte';
	import UkFlag from '$lib/assets/svg/flags/UKFlag.svelte';

	let lang = 'en';
</script>

<nav aria-label="Main">
	<ul class="links">
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/projects">Projects</a>
		</li>
		<li>
			<a href="/about">About</a>
		</li>
	</ul>
	<ul class="settings">
		<li>
			<ThemeToggle height="2em" />
		</li>
		<li class="select motion-select">
			<Select id="motion-select" referBy="Motion Preference" bind:selected={$motion}>
				<Option value={'no-preference'}>
					<span>Keep Animations</span>
					<AnimationIcon />
				</Option>
				<Option value={'reduce'}>
					<span>Reduce Animations</span>
					<AnimationIcon disabled={true} />
				</Option>
			</Select>
		</li>
		<li class="select language-select">
			<Select id="language-select" referBy="Language" bind:selected={lang}>
				<Option value={'en'}>
					<UkFlag />
					<span>En</span>
				</Option>
				<Option value={'fr'}>
					<FranceFlag />
					<span>Fr</span>
				</Option>
			</Select>
		</li>
	</ul>
	<button class="hamburger">
		<svg viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M4 18q-.425 0-.713-.288T3 17q0-.425.288-.713T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18H4Zm0-5q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13H4Zm0-5q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8H4Z"
			/>
		</svg>
	</button>
</nav>

<style lang="scss">
	nav[aria-label='Main'] {
		--_size: 0.15em;
		--_border-size: 0.2rem;
		--_svg-height: 1.5em;
		--_select-fs: 0.9em;

		display: flex;
		justify-content: space-between;
		gap: 0.5rem;

		font-weight: 600;
		font-size: clamp(1.25rem, 3.9vw, 1.525rem);

		margin: 1rem auto 2rem;
		width: var(--page-width);

		top: 1rem;
		position: sticky;
		z-index: 9;

		&::before {
			content: '';
			position: absolute;
			inset: -4rem -2.5rem -2rem;
			filter: blur(1rem);
			box-shadow: inset 0rem 0rem 108rem 4rem var(--background);
			z-index: -1;

			contain: content;
			transition: box-shadow var(--duration) var(--transition);
		}
	}

	ul {
		display: contents;
	}

	.links {
		display: none;
	}

	li {
		display: flex;
		align-items: center;
	}

	a {
		text-decoration: none;
	}

	.hamburger {
		--_size: 0.275em;

		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;

		font-size: var(--_select-fs);
		border: var(--_border-size) solid currentColor;
		border-radius: var(--border-radius);
		background-color: var(--inverse);
		padding: var(--_size);

		svg {
			height: var(--_svg-height);
		}
	}

	.select :global(button span) {
		display: none;
	}

	@media only screen and (width > 40rem) {
		nav[aria-label='Main'] {
			--svg-height: 1.5em;
		}

		.hamburger {
			--_size: 0.15em;
		}

		.motion-select {
			--_size: 0.4em;

			:global(button) {
				:global(span) {
					display: inherit;
				}

				:global(svg) {
					display: none;
				}
			}
		}
	}

	@media only screen and (width > 60rem) {
		.links {
			display: contents;
		}

		.hamburger {
			display: none;
		}
	}
</style>
