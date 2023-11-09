<script lang="ts">
	export let src: string;
	export let alt: string;
	export let placeholderSrc = '';

	function setLoaded(e: Event) {
		const el = e.currentTarget as HTMLImageElement;
		el.parentElement?.classList.remove('loading');
	}
</script>

{#if placeholderSrc}
	<div class="loading lazy-img" style="background-image: url({placeholderSrc});">
		<img class="lazy-img" on:load|once={setLoaded} {src} {alt} {...$$restProps} loading="lazy" />
	</div>
{:else}
	<img class="lazy-img" {src} {alt} {...$$restProps} loading="lazy" />
{/if}

<style lang="scss">
	div {
		height: 100%;
		width: 100%;
		background-repeat: no-repeat;
		background-size: cover;
		border-radius: inherit;
		border-radius: var(--border-radius);
	}

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		transition: opacity var(--duration) var(--transition);
		border-radius: var(--border-radius);
	}

	.loading img {
		opacity: 0;
	}
</style>
