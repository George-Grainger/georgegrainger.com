<svg viewBox="-75 0 1000 600" overflow="visible">
	<g class="moon-wrapper">
		<use class="moon" href="#moon-decorated" x="205" y="80" width="490" height="520" />
	</g>
	<g class="earth-wrapper">
		<use class="earth" href="#earth" x="40" y="200" width="400" height="400" />
	</g>
	<use class="sun" href="#sun" x="630" y="110" height="180" width="180" />
</svg>

<style lang="scss">
	.moon-wrapper,
	.moon,
	.earth-wrapper,
	.earth,
	.sun {
		will-change: transform;
		transition: transform calc(3 * var(--duration)) var(--transition);
	}

	.moon {
		transform-origin: 450px 340px;
	}

	.earth-wrapper {
		transform-origin: 500px 40px;
	}

	.earth {
		transform-origin: 240px 400px;
	}

	.sun {
		transform-origin: 750px 75px;
	}

	:global([data-theme='light']) {
		.moon-wrapper {
			transform: scale(0.2) rotate(45deg) translate(80em);
		}

		.moon {
			transform: rotate(-45deg);
		}
	}

	:global([data-theme='dark']) {
		.earth-wrapper {
			transform: scale(0.4) rotate(45deg) translate(-15em, 20em);
		}

		.earth {
			transform: rotate(-45deg);
		}

		.sun {
			transform: scale(0.3) rotate(-120deg);
		}
	}

	@media only screen and (width > 60rem) {
		svg {
			grid-row: 1 / span 4;
			grid-column: 2;
		}
	}
</style>
