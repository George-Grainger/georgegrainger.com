<svg viewBox="0 0 850 600" overflow="visible">
	<g class="moon-wrapper">
		<use class="moon" href="#moon-decorated" x="205" y="80" width="490" height="520" />
	</g>
	<g class="earth-wrapper">
		<use class="earth" href="#earth" x="40" y="200" width="400" height="400" />
	</g>
	<use class="sun" href="#sun" x="630" y="110" height="180" width="180" />
</svg>

<style lang="scss">
	svg {
		margin: 5rem 25vw;
	}

	.moon-wrapper,
	.moon,
	.earth-wrapper,
	.earth,
	.sun {
		transition: transform calc(3 * var(--duration)) var(--transition);
	}

	.earth {
		transform-origin: 400px 100px;
	}

	.moon {
		transform-origin: 0px -150px;
	}

	.sun {
		transform-origin: 750px 80px;
	}

	:global([data-theme='light']) {
		.moon-wrapper {
			transform: scale(0.2) rotate(60deg) translate(50em, 0em);
		}

		.moon {
			transform: rotate(-60deg);
		}
	}

	:global([data-theme='dark']) {
		.sun {
			transform: scale(0.3) rotate(-180deg);
		}

		.earth-wrapper {
			transform: scale(0.4) rotate(120deg) translate(-30em, -20em);
		}

		.earth {
			transform: rotate(-120deg);
		}
	}
</style>
