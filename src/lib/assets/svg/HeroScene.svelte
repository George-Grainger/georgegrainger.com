<svg viewBox="0 0 800 600" overflow="visible">
	<g class="moon-wrapper">
		<use class="moon" href="#moon-decorated" x="275" y="80" width="490" height="520" />
	</g>
	<g class="earth-wrapper">
		<use class="earth" href="#earth" x="85" y="200" width="400" height="400" />
	</g>
	<use class="sun" href="#sun" x="650" y="60" height="180" width="180" />
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
		transform-origin: 525px 340px;
	}

	.earth-wrapper {
		transform-origin: 400px 0px;
	}

	.earth {
		transform-origin: 265px 400px;
	}

	.sun {
		transform-origin: 725px 60px;
	}

	:global([data-theme='light']) {
		.moon-wrapper {
			transform: scale(0.2) rotate(45deg) translate(100rem, -15rem);
		}

		.moon {
			transform: rotate(-45deg);
		}
	}

	:global([data-theme='dark']) {
		.earth-wrapper {
			transform: scale(0.4) rotate(45deg) translate(-15rem, 20rem);
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
