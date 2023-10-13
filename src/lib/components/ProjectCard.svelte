<article>
	<header>
		<img src="" alt="" />
		<h1>Title</h1>
		<h2>Subtitle</h2>
	</header>
	<section>
		<h1>Title</h1>
		<p>Testing</p>
	</section>
	<button>See More</button>
</article>

<style lang="scss">
	article {
		transition: transform var(--duration) var(--transition);
		display: grid;
		position: relative;
		isolation: isolate;
		width: fit-content;
		margin: auto;

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			z-index: -1;
			transform: scale(0.9, 0.33);
			transform-origin: 50% 20%;
			border-radius: var(--br);
			background-color: var(--card);
			transition: transform var(--duration) var(--transition);
		}

		&:focus-within::before,
		&:hover::before {
			transform: scale(1.2, 1);
		}

		&::after {
			content: attr(attr-index);
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
	}
</style>
