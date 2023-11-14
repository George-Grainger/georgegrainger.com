<script lang="ts">
	export let href: string | undefined;
	export let target = '_blank';
	export let rel = 'noopener noreferrer';

	export let fallback: string | false = false;
</script>

{#if href}
	<a {href} {target} {rel} {...$$restProps} on:click><slot /></a>
{:else if fallback}
	<svelte:element this={fallback} on:click {...$$restProps}><slot /></svelte:element>
{:else}
	<slot />
{/if}
