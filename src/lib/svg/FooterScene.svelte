<script lang="ts">
	import Cow from './symbols/Cow.svelte';
	import Earth from './symbols/Earth.svelte';
	import Mountains from './symbols/Mountains.svelte';
	import Sun from './symbols/Sun.svelte';
	import Trees from './symbols/Trees.svelte';
</script>

<Sun />
<Earth />
<Cow />
<Trees />
<Mountains />

<svg height="500" viewBox="0 0 800 265">
	<!-- <use href="#sun" height="150" /> -->
	<!-- <use href="#earth" height="150" /> -->
	<!-- <use href="#cow" height="150" /> -->
	<!-- <use href="#tree-yellow" height="150" /> -->
	<!-- <use href="#tree-green" height="150" /> -->
	<!-- <use href="#mountain-purple" height="200" width="150" /> -->
	<use href="#mountain-pink" x="-190" y="90" height="265" transform="scale(-0.75, 0.75)" />
	<use href="#mountain-pink" x="170" height="265" transform="scale(0.85, 1.2)" />
	<use href="#mountain-pink" y="50" height="265" transform="scale(0.95)" />
</svg>

<style>
	svg {
		transform-origin: center center;
	}
</style>
