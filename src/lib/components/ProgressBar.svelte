<script lang="ts">
	export let time = 0;
	export let duration: number;

	function format(time: number) {
		if (isNaN(time)) return '--:--';

		const minutes = Math.floor(Math.round(time) / 60);
		const seconds = Math.floor(Math.round(time) % 60);

		return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	}

	function handlePointerDown(e: PointerEvent) {
		const div = e.currentTarget as HTMLElement;

		function seek(e: PointerEvent) {
			const { left, width } = div.getBoundingClientRect();

			let p = (e.clientX - left) / width;
			if (p < 0) p = 0;
			if (p > 1) p = 1;

			time = p * duration ?? 0;
		}
		seek(e);

		window.addEventListener('pointermove', seek);
		window.addEventListener('pointerup', () => window.removeEventListener('pointermove', seek), {
			once: true
		});
	}
</script>

<div on:pointerdown>
	<span>{format(time)}</span>
	<div class="slider" on:pointerdown={handlePointerDown}>
		<div class="progress" style="--progress: {(100 * time) / duration}%" />
	</div>
	<span>{format(duration)}</span>
</div>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.375em;
	}

	div span {
		font-size: 0.4em;
		line-height: 1;
		text-align: center;
		width: 3ch;
	}

	.slider {
		flex: 1;
		height: 0.25em;
		background-color: var(--timeline);
		border-radius: 0.25em;
		overflow: hidden;
	}

	.progress {
		transform-origin: left;
		transform: scaleX(var(--progress));
		background-color: var(--white);
		height: 100%;
		width: 100%;
	}
</style>
