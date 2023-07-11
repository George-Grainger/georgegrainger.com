<script lang="ts">
	import { browser } from '$app/environment';
	import { motion } from '$lib/stores/motion';

	const LOADING = 'Loading...';

	let expanded = false;
	function toggleExpanded() {
		expanded = !expanded;
	}

	function handleChange(e: MouseEvent | KeyboardEvent) {
		let el = e.target as HTMLElement;
		$motion = el.id;
	}

	let btn: HTMLButtonElement;
	$: if (browser && btn) {
		const current = document.getElementById($motion);
		btn.innerHTML = current?.innerHTML || LOADING;
	}
</script>

<button
	type="button"
	aria-haspopup="menu"
	aria-controls="language-menu"
	aria-label="Current Language: English"
	aria-expanded={expanded}
	tabindex="0"
	bind:this={btn}
	on:click={toggleExpanded}
	on:keydown={toggleExpanded}
>
	{LOADING}
</button>
<ul
	id="language-menu"
	role="menu"
	aria-label="Language Options"
	tabindex="-1"
	on:click={handleChange}
	on:keypress={handleChange}
>
	<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
	<li id={motion.REDUCE} role="menuitemradio" aria-checked="true" tabindex="-1">REDUCE</li>
	<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
	<li id={motion.NO_PREFERENCE} role="menuitemradio" aria-checked="false" tabindex="-1">
		NO PREFERNCE
	</li>
</ul>

<style lang="scss">
	[aria-expanded='false'] + [role='menu'] {
		display: none;
	}
</style>
