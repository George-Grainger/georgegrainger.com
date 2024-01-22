<script lang="ts" context="module">
	let current: HTMLAudioElement | undefined;

	function fadeOut(target: HTMLAudioElement) {
		if (target.volume > 0) {
			const newVol = Math.max(0, target.volume - 0.1);
			target.volume = newVol;
			setTimeout(() => fadeOut(target), 30);
		} else {
			target?.pause();
		}
	}

	export function pauseCurrent() {
		if (current) {
			fadeOut(current);
			current = undefined;
		}
	}
</script>

<script lang="ts">
	import PlayIcon from '$lib/assets/svg/audio/PlayIcon.svelte';
	import PauseIcon from '$lib/assets/svg/audio/PauseIcon.svelte';
	import SoundOn from '$lib/assets/svg/audio/SoundOn.svelte';
	import SoundOff from '$lib/assets/svg/audio/SoundOff.svelte';
	import { t } from '$lib/translations';
	import { autoplay } from '$lib/stores/autoplay';
	import ProgressBar from './ProgressBar.svelte';

	export let src: string;

	// The duration appears to only work when it's not preset?

	let duration: number;
	let time = 0;
	let muted = false;
	let paused = true;
	let prevPaused = true;

	function handleClick() {
		paused = !paused;
		$autoplay = paused ? autoplay.OFF : autoplay.ON;
	}

	function handlePlay(e: Event) {
		const audio = e.currentTarget as HTMLAudioElement;

		if (audio !== current) {
			current?.pause();
			current = audio;
		}

		audio.play();
		audio.volume = 1;
	}

	function handlePointerDown() {
		prevPaused = paused;
		paused = true;
	}

	function handlePointerUp() {
		paused = prevPaused;
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
	<button aria-label={$t(paused ? 'home.play' : 'home.pause')} on:click={handleClick}>
		{#if paused}
			<PlayIcon />
		{:else}
			<PauseIcon />
		{/if}
	</button>
	<ProgressBar
		on:pointerdown={handlePointerDown}
		on:pointerup={handlePointerUp}
		bind:time
		bind:duration
	/>
	<button
		class="mute"
		aria-label={$t(muted ? 'home.mute' : 'home.unmute')}
		on:click={() => (muted = !muted)}
		on:keydown
	>
		{#if muted}
			<SoundOff />
		{:else}
			<SoundOn />
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
		background-color: transparent;
		margin: 0.1em;

		&:focus-visible {
			outline: solid var(--red) 0.125em;
		}
	}

	.mute {
		margin: 0.15em;
	}
</style>
