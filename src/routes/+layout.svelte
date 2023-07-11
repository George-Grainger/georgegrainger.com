<script lang="ts">
	import '@fontsource/poppins';
	import '../global.scss';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import SmallClouds from '$lib/svg/symbols/SmallClouds.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Select from '$lib/components/Select.svelte';
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
		<li><Select /></li>
		<li><Select /></li>
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

		a {
			text-decoration: none;
		}
	}
</style>
