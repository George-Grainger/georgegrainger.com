<script lang="ts">
</script>

<symbol id="moon-decorated" viewBox="0 0 490 520">
	<use href="#moon" y="120" width="400" height="400" />
	<use class="cow" href="#cow" x="222" y="7" width="146" height="135" />
	<use href="#astronaut" x="105" y="2" width="160" height="160" />
</symbol>

<svg viewBox="0 0 800 550" overflow="visible">
	<g class="moon-wrapper">
		<use class="moon" href="#moon-decorated" x="205" y="30" width="490" height="520" />
	</g>
	<g class="earth-wrapper">
		<use class="earth" href="#earth" x="40" y="150" width="400" height="400" />
	</g>
	<use class="sun" href="#sun" x="580" y="60" height="180" width="180" />
</svg>

<style lang="scss">
	svg {
		margin: 5rem 25vw;
	}

	.cow {
		rotate: 90deg;
		transform-origin: center;
	}

	.moon-wrapper,
	.moon,
	.earth-wrapper,
	.earth,
	.sun {
		transition: transform 1200ms var(--transition);
	}

	.earth {
		transform-origin: 350px 400px;
	}

	.moon {
		transform-origin: 0px -150px;
	}

	.sun {
		transform-origin: 650px 0;
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
			transform: scale(0.4) rotate(-120deg);
		}

		.earth-wrapper {
			transform: scale(0.4) rotate(120deg) translate(-20em, -30em);
		}

		.earth {
			transform: rotate(-120deg);
		}
	}
</style>
