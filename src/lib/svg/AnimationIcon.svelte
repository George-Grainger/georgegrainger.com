<script lang="ts">
	export let disabled = false;
</script>

<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M8 4C6 4 4 5 4 8v20h4V8h20V4H8Zm8 8c-2 0-4 1-4 4v20h4V16h20v-4H16Zm24 12v16H24V24h16Zm0-4H24c-2 0-4 1-4 4v16c0 2 2 4 4 4h16c2 0 4-2 4-4V24c0-3-2-4-4-4Zm-12 6v12l8-6-8-6Z"
		fill="currentColor"
	/>
	{#if disabled}
		<path stroke="currentColor" stroke-width="4" stroke-linecap="round" d="m3 2 42 42" />
	{/if}
</svg>
