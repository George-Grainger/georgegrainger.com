<svg viewBox="0 0 1360 330">
	<g class="light">
		<g class="move-left">
			<use fill-opacity="0.85" href="#lg-cloud-1" width="457" height="220" x="0" y="100" />
			<use fill-opacity="0.85" href="#lg-cloud-2" width="458" height="214" x="200" y="40" />
		</g>
		<g class="move-right">
			<use fill-opacity="0.85" href="#lg-cloud-1" width="457" height="220" x="700" y="50" />
			<use fill-opacity="0.85" href="#lg-cloud-2" width="458" height="214" x="900" y="110" />
			<use fill-opacity="0.85" href="#lg-cloud-1" width="457" height="220" x="450" y="0" />
		</g>
	</g>
	<g class="dark">
		<g class="move-left">
			<use href="#sm-asteroid-1" width="142" height="80" x="100" y="100" />
			<use href="#sm-asteroid-7" width="160" height="70" x="200" y="225" />
			<use href="#sm-asteroid-2" width="116" height="90" x="315" y="70" />
			<use href="#sm-asteroid-3" width="114" height="64" x="400" y="200" />
			<use href="#sm-asteroid-5" width="120" height="72" x="475" y="95" />
			<use href="#sm-asteroid-9" width="143" height="74" x="575" y="25" />
			<use href="#sm-asteroid-8" width="98" height="96" x="600" y="150" />
		</g>
		<g class="move-right">
			<use href="#sm-asteroid-1" width="142" height="80" x="735" y="150" />
			<use href="#sm-asteroid-4" width="112" height="106" x="775" y="25" />
			<use href="#sm-asteroid-5" width="120" height="72" x="900" y="100" />
			<use href="#sm-asteroid-9" width="143" height="74" x="950" y="200" />
			<use href="#sm-asteroid-7" width="160" height="70" x="1050" y="115" />
			<use href="#sm-asteroid-6" width="100" height="84" x="1125" y="215" />
		</g>
	</g>
</svg>

<style lang="scss">
	svg {
		width: min(240vw, 160rem);
		grid-area: 1 / -1;
		will-change: transform;
		z-index: 3;
		margin-bottom: 15vh;
	}

	g {
		transition: transform calc(3 * var(--duration)) var(--transition);
	}

	:global([data-theme='dark']) .light,
	:global([data-theme='light']) .dark {
		.move-left {
			transform: translateX(-100%);
		}

		.move-right {
			transform: translateX(100%);
		}
	}
</style>
