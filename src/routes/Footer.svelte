<script lang="ts">
	import FooterScene from '$lib/assets/svg/FooterScene.svelte';
</script>

<footer>
	<div class="footer-image"><FooterScene /></div>
	<!-- <div class="footer-text">
		<strong>Preferences</strong>
		<ul>
			<li>
				<a href="/">Test 1</a>
				<a href="/">Test 2</a>
				<a href="/">Test 3</a>
			</li>
		</ul>
		<strong>Created By</strong>
		<span>George Grainger</span>
	</div> -->
</footer>

<style lang="scss">
	footer {
		display: flex;
		justify-content: center;
		flex-direction: column;
		isolation: isolate;
		width: 100vw;
		overflow-x: clip;
	}

	.footer-image {
		position: relative;
		display: flex;
		justify-content: center;
	}
</style>
