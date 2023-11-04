<script lang="ts" context="module">
	let current: HTMLAudioElement | undefined;

	export function pauseCurrent(e: MouseEvent) {
		current?.pause();
		current = undefined;
	}
</script>

<script lang="ts">
	import PlayIcon from '$lib/assets/svg/audio/PlayIcon.svelte';
	import PauseIcon from '$lib/assets/svg/audio/PauseIcon.svelte';
	import SoundOn from '$lib/assets/svg/audio/SoundOn.svelte';
	import SoundOff from '$lib/assets/svg/audio/SoundOff.svelte';

	import { autoplay } from '$lib/stores/autoplay';

	export let src: string;

	// The duration appears to only work when it's not preset?
	let duration: number;
	let time = 0;
	let muted = false;
	let paused = true;

	function format(time: number) {
		if (isNaN(time)) return '--:--';

		const minutes = Math.floor(Math.round(time) / 60);
		const seconds = Math.floor(Math.round(time) % 60);

		return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	}

	function handleClick(_: MouseEvent) {
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

			time = p * duration ?? 0;
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
		bind:muted
		on:play={handlePlay}
		on:ended={() => (time = duration)}
	/>
	<button class="play" aria-label={paused ? 'play' : 'pause'} on:click={handleClick}>
		{#if paused}
			<PlayIcon fill="var(--black)" />
		{:else}
			<PauseIcon fill="var(--black)" />
		{/if}
	</button>
	<div class="time">
		<span>{format(time)}</span>
		<div class="slider" on:pointerdown={handlePointerDown}>
			<div class="progress" style="--progress: {time / duration}%" />
		</div>
		<span>{format(duration)}</span>
	</div>
	<button class="mute" aria-label={muted ? 'mute' : 'unmute'} on:click={() => (muted = !muted)}>
		{#if muted}
			<SoundOff fill="var(--white)" />
		{:else}
			<SoundOn fill="var(--white)" />
		{/if}
	</button>
</div>

<style lang="scss">
	.player {
		display: grid;
		grid-template-columns: 1.25em auto 1.25em;
		grid-column: 1 / -1;
		align-items: center;
		gap: 0.25em;
		user-select: none;
		margin-top: 0.125em;
		margin-left: -0.25em;
	}

	button {
		display: grid;
		aspect-ratio: 1;
		border: none;
		border-radius: 100vmax;
	}

	.play {
		padding: 0.15em;
		margin: 0.15em;
	}

	.mute {
		margin: 0.15em;
		background: none;
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
