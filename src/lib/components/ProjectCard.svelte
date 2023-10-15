<script lang="ts">
	import symput from '$lib/assets/projects/symput.svg';
	import Button from './Button.svelte';
</script>

<article>
	<header>
		<img src={symput} alt="" />
		<h1>Symput</h1>
		<h2>An Android keyboard and associated full stack website for feedback</h2>
	</header>
	<section>
		<strong aria-hidden="true">Symput</strong>
		<p>
			Created a full stack website, symput.com allowing users of our first-year group project
			android keyboard to provide feedback. The site includes a CMS, user profiles, serverless
			functions and more!
		</p>
		<div>
			<Button>View Details</Button>
		</div>
	</section>
</article>

<style lang="scss">
	article {
		display: grid;
		position: relative;
		isolation: isolate;
		width: fit-content;
		margin: auto;
		transition: transform var(--duration) var(--transition);

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			z-index: -1;
			transform: scale(0.9, 0.33);
			transform-origin: 50% 20%;
			border-radius: var(--border-radius);
			background-color: var(--card);
			transition: transform var(--duration) var(--transition);
		}

		&:focus-within::before,
		&:hover::before {
			transform: scale(1.2, 1);
		}

		&::after {
			counter-increment: card-num;
			content: counter(card-num);
			position: absolute;
			right: 10%;
			font-weight: 600;
			color: var(--white);
			background-color: var(--black);
			padding: 0.5em 0.5em 0.75em;
			clip-path: polygon(100% 0%, 100% 100%, 50% 85%, 0 100%, 0 0);
			transition: transform var(--duration) var(--transition);
		}

		&:hover::after,
		&:focus-within::after {
			transform: translateX(100%);
		}

		&:focus-within,
		&:hover {
			header {
				transform: translateY(-33%) scale(0.6);

				h1,
				h2 {
					opacity: 0;
				}
			}

			section {
				opacity: 1;
				transform: translateY(0);
				pointer-events: auto;
				transition: transform var(--duration) var(--transition),
					opacity var(--duration) var(--transition);
			}
		}
	}

	header,
	section {
		grid-area: -1/-1;
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-bottom: auto;
		transition: transform var(--duration) var(--transition);

		img {
			border-radius: var(--border-radius);
			object-fit: cover;
			aspect-ratio: 5 / 6;
		}

		h1,
		h2 {
			line-height: 1;
			margin-inline: 0.25em;
			transition: opacity var(--duration) var(--transition);
		}

		h2 {
			font-size: 0.75em;
			font-weight: 600;
			color: var(--hover-inverse);
			text-wrap: balance;
		}
	}

	section {
		display: grid;
		place-items: center;
		text-align: center;
		z-index: -1;
		gap: 1em;
		margin-top: 60%;
		opacity: 0;
		padding-bottom: 1em;
		pointer-events: none;
		transform: translateY(5%);

		strong {
			font-weight: 700;
			font-size: 1.5em;
		}

		p {
			font-size: 0.9em;
			width: 110%;
			text-wrap: balance;
		}
	}
</style>
