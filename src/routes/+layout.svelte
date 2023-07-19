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
		<li class="self-end">
			<ThemeToggle />
		</li>
		<li class="self-stretch">
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
		<li class="self-stretch">
			<Select id="language-select" referBy="Language" updates={$motion}>
				<Option value={motion.NO_PREFERENCE}>
					<UkFlag />
					<span>English</span>
				</Option>
				<Option value={motion.REDUCE}>
					<FranceFlag />
					<span>French</span>
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
			justify-content: space-evenly;
			align-items: center;
			font-weight: 600;
			font-size: 1.1em;
		}

		.self-stretch {
			align-self: stretch;
		}

		.self-end {
			align-self: flex-end;
		}

		a {
			text-decoration: none;
		}
	}

	:global([aria-controls='motion-select'] svg),
	:global([aria-controls='language-select'] span) {
		display: none;
	}

	// @media only screen and (max-width: 60rem) {
	// 	li:has(> a) {
	// 		display: none;
	// 	}
	// }
</style>
