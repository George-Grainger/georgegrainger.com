<script lang="ts">
	import { motion } from '$lib/stores/motion';

	let expanded = false;
	const toggleExpanded = () => {
		expanded = !expanded;
	};
</script>

<button
	type="button"
	aria-haspopup="menu"
	aria-controls="language-menu"
	aria-label="Current Language: English"
	aria-expanded={expanded}
	tabindex="0"
	on:click={toggleExpanded}
	on:keydown={toggleExpanded}
>
	{$motion}
</button>
<ul id="language-menu" role="menu" aria-label="Language Options" tabindex="-1">
	<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
	<li
		role="menuitemradio"
		aria-checked="true"
		tabindex="-1"
		on:click={() => ($motion = motion.REDUCE)}
		on:keydown={() => ($motion = motion.REDUCE)}
	>
		REDUCE
	</li>
	<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
	<li
		role="menuitemradio"
		aria-checked="false"
		tabindex="-1"
		on:click={() => ($motion = motion.NO_PREFERENCE)}
		on:keydown={() => ($motion = motion.NO_PREFERENCE)}
	>
		NO PREFERNCE
	</li>
</ul>

<style lang="scss">
	[aria-expanded='false'] + [role='menu'] {
		display: none;
	}
</style>
