<script lang="ts">
	import { onMount } from 'svelte';

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
			{ rootMargin: '0px 0px -500px 0px' }
		);

		const aboutGroup = document.getElementById('about-me')?.firstChild as HTMLElement;
		aboutGroup && aboutTriggerObserver.observe(aboutGroup);
	});
</script>

<svg viewBox="0 0 1360 520" overflow="visible">
	<g class="light">
		<g class="move-left" fill-opacity="0.85">
			<use href="#lg-cloud-2" width="458" height="214" x="450" y="0" />
			<use href="#lg-cloud-2" width="458" height="214" x="150" y="40" />
			<use href="#lg-cloud-2" width="457" height="220" x="70" y="180" />
			<use href="#lg-cloud-1" width="457" height="220" x="375" y="165" />
			<use href="#lg-cloud-1" width="458" height="214" x="70" y="300" />
		</g>
		<g class="move-right" fill-opacity="0.85">
			<use href="#lg-cloud-1" width="458" height="214" x="450" y="280" />
			<use href="#lg-cloud-1" width="457" height="220" x="600" y="55" />
			<use href="#lg-cloud-2" width="458" height="214" x="750" y="135" />
			<use href="#lg-cloud-1" width="457" height="220" x="760" y="300" />
		</g>
	</g>
	<g class="dark">
		<g class="move-left">
			<use href="#asteroid-8" width="98" height="96" x="570" y="320" />
			<use href="#asteroid-1" width="142" height="80" x="100" y="200" />
			<use href="#asteroid-7" width="160" height="70" x="300" y="55" />
			<use href="#asteroid-9" width="143" height="74" x="200" y="355" />
			<use href="#asteroid-2" width="116" height="90" x="315" y="170" />
			<use href="#asteroid-3" width="114" height="64" x="400" y="300" />
			<use href="#asteroid-5" width="120" height="72" x="555" y="175" />
		</g>
		<g class="move-right">
			<use href="#asteroid-9" width="143" height="74" x="575" y="50" />
			<use href="#asteroid-1" width="142" height="80" x="730" y="230" />
			<use href="#asteroid-4" width="112" height="106" x="775" y="75" />
			<use href="#asteroid-5" width="120" height="72" x="900" y="200" />
			<use href="#asteroid-2" width="116" height="90" x="750" y="370" />
			<use href="#asteroid-7" width="160" height="70" x="950" y="375" />
			<use href="#asteroid-6" width="100" height="84" x="1050" y="275" />
		</g>
	</g>
</svg>

<style lang="scss">
	svg {
		place-self: start center;
		width: min(240vw, 160rem);
		position: absolute;
		z-index: 3;
		top: -10rem;
		pointer-events: none;
	}

	:global([data-motion='no-preference']) g {
		transition: transform calc(3 * var(--duration)) var(--transition);
	}

	:global([data-motion='reduce']) .move-left,
	:global(.animate-now) .move-left {
		transform: translateX(calc(-1 * var(--rm-translation)));
	}

	:global([data-motion='reduce']) .move-right,
	:global(.animate-now) .move-right {
		transform: translateX(calc(1 * var(--rm-translation)));
	}

	:global([data-theme='dark']) .light,
	:global([data-theme='light']) .dark {
		.move-left {
			transform: translateX(min(-33vw, -100%));
		}

		.move-right {
			transform: translateX(max(33vw, 100%));
		}
	}

	@media only screen and (width <= 40rem) {
		.dark g {
			:nth-child(n + 2) {
				display: none;
			}

			&:first-child :first-child {
				transform-origin: 596px 330px;
				scale: 400%;
			}

			:first-child {
				transform-origin: 632px 75px;
				scale: 400%;
			}
		}

		.light g {
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
</style>
