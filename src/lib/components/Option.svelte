<script lang="ts">
	export let value: string;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<li role="menuitemradio" aria-checked="false" tabindex="-1" data-value={value}>
	<slot>Placeholder</slot>
</li>
