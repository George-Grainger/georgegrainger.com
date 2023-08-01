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
	<ul>
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="#projects">Projects</a>
		</li>
		<li>
			<a href="#home">About</a>
		</li>
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
</nav>

<main>
	<slot />
</main>

<Footer />

<!-- SVG Symbols -->
<SmallClouds />

<style lang="scss">
	nav[aria-label='Main'] {
		margin-top: 1rem;

		ul {
			display: flex;
			justify-content: space-between;
			font-weight: 600;
			font-size: clamp(1.125rem, 3.5vw, 1.375rem);

			width: min(100vw - 2rem, var(--page-width));
			margin: auto;
		}

		li {
			display: flex;
			align-items: center;
			height: 1.75em;
		}

		a {
			text-decoration: none;
		}

		:global([data-wraps='language-select']) {
			--_size: 0.275em;
			--_svg-size: 1.75em;
		}

		:global([aria-controls='motion-select'] svg),
		:global([aria-controls='language-select'] span) {
			display: none;
		}
	}

	// @media only screen and (max-width: 60rem) {
	// 	li:has(> a) {
	// 		display: none;
	// 	}
	// }
</style>
