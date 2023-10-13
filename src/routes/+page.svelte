<script lang="ts">
	import '@fontsource/poppins/800.css';
	import HeroScene from './HeroScene.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<section id="hero" class="hero">
	<h1>Hello there</h1>
	<h2>Thanks for stopping by</h2>
	<HeroScene />
	<p class="intro">I'm George, a final year computer science student based in Manchester</p>
</section>

<section />
<!-- <ProjectCard /> -->
<section />

<style lang="scss">
	section {
		display: grid;
	}

	.hero {
		place-items: center;
		gap: 0.5em 3.5em;
		font-size: clamp(1.125rem, 3.5vw, 1.875rem);

		h1 {
			line-height: 1;
			font-weight: 800;
			font-size: 3.2125em;
			letter-spacing: -0.03rem;
		}

		h2 {
			font-weight: 800;
			font-size: 1.5em;
			letter-spacing: -0.015rem;
			margin-bottom: 1em;
		}

		p {
			text-align: center;
			margin-top: 3em;
			font-size: 0.9em;
			max-width: 32ch;
			text-wrap: balance;
		}
	}

	@media only screen and (width > 60rem) {
		.hero {
			row-gap: 0.1em;
			grid-template-columns: auto 1fr;

			h1 {
				margin-top: 12.5%;
			}

			h2 {
				margin-block: 0.25em;
			}

			p {
				text-align: justify;
				text-align-last: center;
				margin-top: 0;
				font-size: 0.7em;
				max-width: 40ch;
				text-wrap: initial;
			}
		}
	}
</style>
