<script lang="ts">
	import '@fontsource/poppins/800.css';
	import HeroScene from '../lib/assets/svg/HeroScene.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import symput from '$lib/assets/projects/Symput.svg';
	import TopTrackCard from '$lib/components/TopTrackCard.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<section id="hero" class="hero">
	<h1>Hello there</h1>
	<h2>Thanks for stopping by</h2>
	<HeroScene />
	<p class="intro">I'm George, a final year computer science student based in Manchester</p>
	<Button href="/#about-me">About me</Button>
</section>

<section id="projects" class="projects">
	<ProjectCard technologies={['assembly', 'iot', 'love']}>
		<svelte:fragment slot="image"><img src={symput} alt="Symput Logo" /></svelte:fragment>
		<svelte:fragment slot="title">Test</svelte:fragment>
	</ProjectCard>
</section>

<section id="about-me" class="about-me">
	<ul>
		{#each data.topTracks as track}
			<TopTrackCard tag="li" {...track} />
		{/each}
	</ul>
</section>

<style lang="scss">
	section {
		display: grid;
	}

	.hero {
		place-items: center;
		gap: 0.5em 1em;
		font-size: clamp(1.125rem, 3.5vw, 1.875rem);

		h1 {
			line-height: 1;
			font-weight: 800;
			font-size: 3.2125em;
			letter-spacing: -0.03rem;
		}

		h2 {
			font-weight: 700;
			font-size: 1.525em;
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

		:global(a) {
			margin-block: 1em;
		}
	}

	.projects {
		display: grid;
		grid-template-columns: repeat(auto-fill, 18rem);
		justify-content: center;
		gap: 2em 4em;
		font-size: 1.125rem;
		margin-bottom: 2.5%;
		counter-reset: card-num;
	}

	.about-me {
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;

		ul {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			align-items: center;
			gap: 0.5em;
			aspect-ratio: 1;

			:global(li) {
				z-index: 0;
				transform-origin: var(--_horizontal, 50%) var(--_vertical, 50%);
				transition: transform var(--duration) var(--transition),
					z-index 1ms var(--transition) var(--duration);

				&:focus-within {
					transition: transform var(--duration) var(--transition);
					transform: scale(3.15);
					z-index: 1;
				}

				&:nth-child(-n + 3) {
					--_vertical: 1%;
				}

				&:nth-child(n + 7) {
					--_vertical: 99%;
				}

				&:nth-child(3n + 1) {
					--_horizontal: 1%;
				}

				&:nth-child(3n + 3) {
					--_horizontal: 99%;
				}
			}
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

			:global(a) {
				font-size: 0.9em;
			}
		}
	}
</style>
