<script lang="ts">
	export let src: string;
	export let alt: string;
	export let placholderSrc: string;

	function setLoaded(e: Event) {
		const el = e.currentTarget as HTMLImageElement;
		el.classList.add('loaded');
	}
</script>

<div style="background-image: url({placholderSrc});">
	<img on:load|once={setLoaded} {src} {alt} {...$$restProps} />
</div>

<style lang="scss">
	div {
		height: 100%;
		width: 100%;
		background-repeat: no-repeat;
		background-size: cover;
	}

	div img {
		opacity: 0;
		transition: opacity var(--duration) var(--transition);

		&.loaded {
			opacity: 1;
		}
	}
</style>
