<script lang="ts" context="module">
	let current: HTMLAudioElement | null;

	export function pauseCurrent() {
		current?.pause();
	}
</script>

<script lang="ts">
	import playIcon from '$lib/assets/svg/audio/play.svg';
	import { autoplay } from '$lib/stores/autoplay';

	export let src: string;

	let time = 0;
	let duration = 0;
	let paused = false;
	let muted = false;

	function format(time: number) {
		if (isNaN(time)) return '...';

		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);

		return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	}

	function handleClick(e: MouseEvent) {
		console.log('Here too');
		paused = !paused;
		$autoplay = paused ? autoplay.OFF : autoplay.ON;
	}

	function handlePlay(e: Event) {
		const audio = e.currentTarget as HTMLAudioElement;

		if (audio !== current) {
			current?.pause();
			current = audio;
		}

		current.play();
	}

	function handlePointerDown(e: PointerEvent) {
		const div = e.currentTarget as HTMLElement;

		function seek(e: PointerEvent) {
			const { left, width } = div.getBoundingClientRect();

			let p = (e.clientX - left) / width;
			if (p < 0) p = 0;
			if (p > 1) p = 1;

			time = p * duration;
		}
		seek(e);

		window.addEventListener('pointermove', seek);
		window.addEventListener('pointerup', () => window.removeEventListener('pointermove', seek), {
			once: true
		});
	}
</script>

<div class="player">
	<audio
		{src}
		bind:currentTime={time}
		bind:duration
		bind:paused
		on:play={handlePlay}
		on:ended={() => (time = 0)}
	/>
	<button class="play" aria-label={paused ? 'play' : 'pause'} on:click={handleClick}>
		<img src={playIcon} alt="Play Button" />
	</button>
	<div class="time">
		<span>{format(time)}</span>
		<div class="slider" on:pointerdown={handlePointerDown}>
			<div class="progress" style="--progress: {time / duration}%" />
		</div>
		<span>{duration ? format(duration) : '--:--'}</span>
	</div>
	<button class="mute" aria-label={muted ? 'mute' : 'unmute'} on:click={() => (muted = !muted)}>
		<img src={playIcon} alt="Play Button" />
	</button>
</div>

<style lang="scss">
	.player {
		display: grid;
		grid-template-columns: 0.75em 1fr 0.75em;
		grid-column: 1 / -1;
		align-items: center;
		gap: 0.75em;
		user-select: none;
	}

	button {
		display: grid;
		aspect-ratio: 1;
		border-radius: 100vmax;
		border: none;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.375em;
	}

	.time span {
		font-size: 0.4em;
		line-height: 1;
	}

	.slider {
		flex: 1;
		height: 0.25em;
		background: var(--white);
		border-radius: 0.25em;
		overflow: hidden;
	}

	.progress {
		width: calc(100 * var(--progress));
		height: 100%;
		background: var(--red);
	}
</style>
