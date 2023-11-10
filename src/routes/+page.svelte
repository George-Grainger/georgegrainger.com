<script lang="ts">
	import '@fontsource/poppins/800.css';
	import HeroScene from '../lib/assets/svg/HeroScene.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import TopTracks from './TopTracks.svelte';
	import LastPlayedCard from '$lib/components/LastPlayedCard.svelte';
	import { getContext, onMount } from 'svelte/internal';
	import { invalidate } from '$app/navigation';
	import { browser } from '$app/environment';
	import LazyImage from '$lib/components/LazyImage.svelte';

	export let data;
	const { t, locale } = getContext('translations');

	onMount(() => {
		let previousY = 0;
		const aboutTriggerObserver = new IntersectionObserver(
			([entry]) => {
				const currentY = entry.boundingClientRect.y;
				if (entry.isIntersecting) {
					// Scroll down into area
					entry.target.classList.add('animate-now');
				} else if (currentY >= previousY) {
					// Scroll up out of area
					entry.target.classList.remove('animate-now');
				}
				previousY = currentY;
			},
			{ threshold: 0.4 }
		);
		const aboutClouds = document.getElementById('about-me')?.firstChild as HTMLElement;
		aboutClouds && aboutTriggerObserver.observe(aboutClouds);
	});

	$: {
		if (browser && $locale) {
			invalidate('home:data');
		}
	}
</script>

<section id="hero" class="hero">
	<h1>{$t('home.title')}</h1>
	<h2>{$t('home.subtitle')}</h2>
	<HeroScene />
	<p class="intro">{$t('home.intro-paragraph')}</p>
	<Button href="/#about-me">{$t('home.about-me')}</Button>
</section>

<section id="projects" class="projects">
	<div class="cloud-wrapper">
		<svg viewBox="0 0 1360 330">
			<use fill-opacity="0.85" href="#lg-cloud-1" width="457" height="220" x="0" y="100" />
			<use fill-opacity="0.85" href="#lg-cloud-2" width="458" height="214" x="200" y="40" />
			<use fill-opacity="0.85" href="#lg-cloud-1" width="457" height="220" x="700" y="50" />
			<use fill-opacity="0.85" href="#lg-cloud-2" width="458" height="214" x="900" y="110" />
			<use fill-opacity="0.85" href="#lg-cloud-1" width="457" height="220" x="450" y="0" />
		</svg>
		<h1 id="project-title">{$t('home.projects-title')}</h1>
	</div>
	{#each data.projects as project}
		<ProjectCard technologies={project.technologies} href={project.slug}>
			<svelte:fragment slot="image">
				<LazyImage
					placeholderSrc={project.placeholderSrc || ''}
					src={project.src}
					alt={project.alt}
				/>
			</svelte:fragment>
			<svelte:fragment slot="title">{project.title}</svelte:fragment>
			<svelte:fragment slot="subtitle">{project.subtitle}</svelte:fragment>
			<svelte:fragment slot="description">{project.description}</svelte:fragment>
		</ProjectCard>
	{/each}
</section>

<section id="about-me" class="about-me">
	<svg viewBox="0 0 1360 520" overflow="visible">
		<g class="move-left">
			<use fill-opacity="0.85" href="#lg-cloud-2" width="458" height="214" x="450" y="0" />
			<use fill-opacity="0.85" href="#lg-cloud-2" width="458" height="214" x="150" y="40" />
			<use fill-opacity="0.85" href="#lg-cloud-2" width="457" height="220" x="70" y="180" />
			<use fill-opacity="0.85" href="#lg-cloud-1" width="457" height="220" x="375" y="165" />
			<use fill-opacity="0.85" href="#lg-cloud-1" width="458" height="214" x="70" y="300" />
		</g>
		<g class="move-right">
			<use fill-opacity="0.85" href="#lg-cloud-1" width="458" height="214" x="450" y="280" />
			<use fill-opacity="0.85" href="#lg-cloud-1" width="457" height="220" x="600" y="55" />
			<use fill-opacity="0.85" href="#lg-cloud-2" width="458" height="214" x="750" y="135" />
			<use fill-opacity="0.85" href="#lg-cloud-1" width="457" height="220" x="760" y="300" />
		</g>
	</svg>
	<h1 class="about-title">{$t('home.about')}</h1>
	<div class="prose">
		<h2>{$t('home.academic-title')}</h2>
		{#each $t('home.academic-paragraphs') as paragraph}
			<p>{@html paragraph}</p>
		{/each}
		<h2>{$t('home.experience-title')}</h2>
		{#each $t('home.experience-paragraphs') as paragraph}
			<p>{@html paragraph}</p>
		{/each}
		<ol>
			{#each $t('home.enigma-roles') as paragraph}
				<li>{@html paragraph}</li>
			{/each}
		</ol>
		<h2>{$t('home.interests-title')}</h2>
		{#each $t('home.interests-paragraphs') as paragraph}
			<p>{@html paragraph}</p>
		{/each}
		<Button href="/GeorgeGraingerCV.pdf" target="_blank">View my CV</Button>
	</div>
	<div class="spotify">
		<h2>Spotify</h2>
		<p>{$t('home.spotify-tagline')}</p>
		<TopTracks topTracks={data.topTracks} />
		<LastPlayedCard {...data.currentTrack} />
	</div>
</section>

<style lang="scss">
	section {
		display: grid;
	}

	.hero {
		place-items: center;
		gap: 1em 0em;
		font-size: clamp(1.125rem, 3.5vw, 1.875rem);
		text-align: center;
		margin-top: 5rem;

		h1 {
			line-height: 1;
			font-weight: 800;
			font-size: 3.2125em;
			letter-spacing: -0.03rem;
			white-space: nowrap;
		}

		h2 {
			line-height: 1;
			font-weight: 700;
			font-size: 1.525em;
			letter-spacing: -0.015rem;
			margin-bottom: 1em;
			white-space: nowrap;
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
		align-items: start;
		gap: 2em 4em;
		margin-bottom: 2.5%;
		counter-reset: card-num;
		margin-top: min(10vw, 15rem);

		h1 {
			transition: translate var(--duration) var(--transition);
			position: sticky;
			top: 33vh;
			grid-area: 1 / -1;
			place-self: start center;
			margin-block: 1em 0.25em;

			// Scroll animation
			view-timeline: --subjectReveal block;
			animation-timeline: --subjectReveal;

			animation-name: appear;
			animation-fill-mode: both;
			animation-duration: 1ms; /* Firefox requires this to apply the animation */
		}

		.cloud-wrapper {
			display: grid;
			grid-column: 1 / -1;
			place-self: start center;
			isolation: isolate;
			pointer-events: none;

			svg {
				width: min(240vw, 160rem);
				grid-area: 1 / -1;
				will-change: transform;
				z-index: 3;
				margin-bottom: 15vh;
			}
		}

		:global(article) {
			font-size: 1.125rem;
		}
	}

	.about-me {
		position: relative;
		gap: 2rem;
		margin-top: 20rem;

		svg {
			place-self: start center;
			width: min(240vw, 160rem);
			position: absolute;
			z-index: 3;
			top: -10rem;
		}

		g {
			transition: transform calc(2 * var(--duration)) var(--transition);
		}
	}

	:global([data-motion='reduce']) .move-left,
	:global(.animate-now) .move-left {
		transform: translateX(calc(-1 * var(--rm-translation)));
	}

	:global([data-motion='reduce']) .move-right,
	:global(.animate-now) .move-right {
		transform: translateX(calc(1 * var(--rm-translation)));
	}

	h1 {
		font-weight: 700;
		font-size: 3em;
	}

	.spotify {
		display: grid;
		align-content: baseline;
		gap: 1em;

		h2 {
			font-size: 1.3em;
			font-weight: 700;
		}

		p {
			margin-top: -1em;
		}
	}

	@media only screen and (width > 60rem) {
		.hero {
			row-gap: 0.5em;
			grid-template-columns: 1fr 1fr;

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

			p:lang(fr) {
				max-width: 30ch;
			}

			:global(a) {
				font-size: 0.9em;
			}
		}

		.about-me {
			grid-template-columns: repeat(2, 1fr);

			h1 {
				grid-column: 1 / -1;
			}
		}
	}

	@media only screen and (width <= 60rem) {
		.about-me g {
			:nth-child(n + 2) {
				display: none;
			}

			&:first-child :first-child {
				transform-origin: 683px 0px;
				scale: 250%;
			}

			:first-child {
				transform-origin: 729px 170px;
				scale: 250%;
			}
		}
	}

	@keyframes appear {
		0%,
		40% {
			opacity: 0;
		}

		70% {
			opacity: 1;
		}
	}
</style>
