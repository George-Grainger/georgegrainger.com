<script lang="ts">
	export let href: string | undefined;
	export let target = '_blank';
	export let rel = 'noopener noreferrer';

	export let fallback: string | false = false;
	export let role: string | null = 'button';

	const tabindex = role == 'button' ? 0 : null;
</script>

{#if href}
	<a {href} {target} {rel} {...$$restProps} on:click><slot /></a>
{:else if fallback}
	<svelte:element this={fallback} {role} {tabindex} on:click {...$$restProps}>
		<slot />
	</svelte:element>
{:else}
	<slot />
{/if}
