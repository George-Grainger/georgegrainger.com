<script lang="ts">
	export let href: string | undefined;
	export let fallback: string | false = false;
	export let target = '_blank';
	export let rel = 'noopener noreferrer';
</script>

{#if href}
	<a {href} {target} {rel} {...$$restProps}><slot /></a>
{:else if fallback}
	<svelte:element this={fallback} {...$$restProps}><slot /></svelte:element>
{:else}
	<slot />
{/if}
