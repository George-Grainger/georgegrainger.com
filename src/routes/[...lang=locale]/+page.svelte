<script lang="ts">
	import '@fontsource/poppins/800.css';
	import HeroScene from '$lib/assets/svg/HeroScene.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import TopTracks from '$lib/components/TopTracks.svelte';
	import LastPlayedCard from '$lib/components/LastPlayedCard.svelte';
	import LazyImage from '$lib/components/LazyImage.svelte';
	import { t } from '$lib/translations';
	import AboutCloudGroup from '$lib/assets/svg/AboutCloudGroup.svelte';
	import ProjectCloudGroup from '$lib/assets/svg/ProjectCloudGroup.svelte';

	export let data;
</script>

<svelte:head>
	<title>{$t('home.browser-title')}</title>
</svelte:head>

<section id="hero" class="hero">
	<h1>{$t('home.title')}</h1>
	<h2>{$t('home.subtitle')}</h2>
	<HeroScene />
	<p class="intro">{$t('home.intro-paragraph')}</p>
	<Button href={`#about-me`}>{$t('home.about-me')}</Button>
</section>

<section id="projects" class="projects">
	<div class="cloud-wrapper">
		<ProjectCloudGroup />
		<h1 id="project-title">{$t('home.projects-title')}</h1>
	</div>
	{#each data.projects as project}
		<ProjectCard tags={project.tags} href={project.slug}>
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
	<AboutCloudGroup />
	<h1 class="about-title">{$t('home.about')}</h1>
	<div class="prose about-info">
		<h2>{$t('home.academic-title')}</h2>
		{#each $t('home.academic-paragraphs') as paragraph}
			<p>{@html paragraph}</p>
		{/each}
		<h2>{$t('home.experience-title')}</h2>
		<h3>Imago Software</h3>
		{#each $t('home.imago-paragraphs') as paragraph}
			<p>{@html paragraph}</p>
		{/each}
		<h3>NimbleAI</h3>
		{#each $t('home.nimble-paragraphs') as paragraph}
			<p>{@html paragraph}</p>
		{/each}
		<h3>Enigma Interactive</h3>
		{#each $t('home.enigma-paragraphs') as paragraph}
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
		<div class="spotify">
			<h2>Spotify</h2>
			<p>{$t('home.spotify-tagline')}</p>
			<TopTracks topTracks={data.topTracks} />
			<LastPlayedCard {...data.currentTrack} />
		</div>
	</div>
	<Button href="/GeorgeGraingerCV.pdf" target="_blank">{$t('home.cv')}</Button>
</section>

<style lang="scss">
	section {
		display: grid;
		max-width: var(--page-width);
	}

	.hero {
		place-items: center;
		gap: 1em 0em;
		font-size: clamp(1.125rem, 3.5vw, 1.875rem);
		text-align: center;

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
			max-width: 31ch;
		}

		:global(a) {
			margin-block: 1em;
		}
	}

	.projects {
		display: grid;
		grid-template-columns: repeat(auto-fill, min(20rem, 100vw - 5rem));
		justify-content: center;
		align-items: start;
		gap: 2rem 4rem;
		margin-bottom: 2.5%;
		counter-reset: card-num;
		margin-top: min(10vw, 15rem);

		h1 {
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
			z-index: 5;
		}

		:global(article) {
			font-size: 1.125rem;
			margin-block: 0;
		}
	}

	.about-me {
		position: relative;
		gap: 2rem;
		margin-top: 20rem;
	}

	.spotify {
		display: grid;
		align-content: baseline;
		gap: 1em;

		h2 {
			font-size: 1.3em;
			font-weight: 600;
			margin-top: 0.75em;
		}

		p {
			margin-top: -1em;
		}

		&,
		:global(ol),
		:global(li),
		:global(div) {
			margin: 0; /* Reset margin for elements directly under .no-prose */
		}
	}

	:global([data-motion='no-preference']) .projects h1 {
		transition: translate var(--duration) var(--transition);
	}

	@media only screen and (min-width: 60rem) {
		.hero {
			row-gap: 0.5em;
			grid-template-columns: 1fr 1fr;
			margin-top: 5rem;

			h2 {
				margin-block: 0.25em;
			}

			p {
				text-align-last: center;
				margin-top: 0;
				font-size: 0.7em;
				max-width: 41ch;
			}

			p:lang(fr) {
				max-width: 33ch;
			}

			:global(a) {
				font-size: 0.9em;
			}
		}

		.about-info {
			columns: 2;
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
