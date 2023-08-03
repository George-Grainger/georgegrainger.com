<script lang="ts">
	import '@fontsource/poppins';
	import '../global.scss';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import SmallClouds from '$lib/svg/symbols/SmallClouds.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Option from '$lib/components/Option.svelte';
	import Select from '$lib/components/Select.svelte';
	import { motion } from '$lib/stores/motion';
	import AnimationIcon from '$lib/svg/AnimationIcon.svelte';
	import FranceFlag from '$lib/svg/flags/FranceFlag.svelte';
	import UkFlag from '$lib/svg/flags/UKFlag.svelte';
</script>

<nav aria-label="Main">
	<ul class="links">
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="#projects">Projects</a>
		</li>
		<li>
			<a href="#home">About</a>
		</li>
	</ul>
	<ul class="settings">
		<li>
			<ThemeToggle />
		</li>
		<li>
			<Select id="motion-select" referBy="Motion Preference" updates={$motion}>
				<Option value={motion.NO_PREFERENCE}>
					<span>Keep Animations</span>
					<AnimationIcon />
				</Option>
				<Option value={motion.REDUCE}>
					<span>Reduce Animations</span>
					<AnimationIcon disabled={true} />
				</Option>
			</Select>
		</li>
		<li>
			<Select id="language-select" referBy="Language" updates={$motion}>
				<Option value={motion.NO_PREFERENCE}>
					<UkFlag />
					<span>En</span>
				</Option>
				<Option value={motion.REDUCE}>
					<FranceFlag />
					<span>Fr</span>
				</Option>
			</Select>
		</li>
	</ul>
	<button class="hamburger">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M4 18q-.425 0-.713-.288T3 17q0-.425.288-.713T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18H4Zm0-5q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13H4Zm0-5q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8H4Z"
			/>
		</svg>
	</button>
</nav>

<main>
	<slot />
</main>

<Footer />

<!-- SVG Symbols -->
<SmallClouds />

<style lang="scss">
	nav[aria-label='Main'] {
		--_size: 0.5em;
		--_border-size: 0.2em;
		--_svg-size: 1.5em;
		--_select-fs: 0.9em;

		display: flex;
		justify-content: space-between;
		gap: 2ch;

		font-weight: 600;
		font-size: clamp(1.125rem, 3.5vw, 1.375rem);

		margin: 1rem auto;
		width: min(100vw - 2rem, var(--page-width));

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
			--_size: 0.25em;
			--_svg-size: 1.8em;

			display: flex;
			font-size: var(--_select-fs);
			border: var(--_border-size) solid currentColor;
			border-radius: var(--border-radius);
			background-color: var(--inverse);
			padding: calc(0.5 * var(--_size)) var(--_size);
		}

		:global(svg) {
			height: var(--_svg-size);
		}

		:global([data-wraps='language-select']) {
			--_size: 0.275em;
			--_svg-size: 1.75em;
		}

		:global([aria-controls='motion-select'] span),
		:global([aria-controls='language-select'] span) {
			display: none;
		}

		@media only screen and (width > 40rem) {
			:global([aria-controls='motion-select'] span) {
				display: inherit;
			}

			:global([aria-controls='motion-select'] svg) {
				display: none;
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
	}
</style>
