<script lang="ts">
	import FooterScene from '$lib/svg/FooterScene.svelte';
</script>

<footer>
	<div class="footerImage"><FooterScene /></div>
	<div class="footerText">
		<strong>Preferences</strong>
		<ul>
			<li>
				<a href="/"> Test </a>
			</li>
		</ul>
		<strong>Created By</strong>
		<span>George Grainger</span>
	</div>
</footer>

<style lang="scss">
	footer {
		display: flex;
		justify-content: center;
		overflow-x: clip;
		flex-direction: column;
		isolation: isolate;
	}

	.footerImage {
		position: relative;
		display: flex;
		flex: 1 0 auto;
		justify-content: center;
	}

	.footerText {
		display: grid;
		padding: 0 5vw 1em;
		color: var(--black);
		background-color: var(--clr-footer);
		z-index: 1;
		gap: 0.25em;
		grid-template-columns: repeat(2, auto);
		grid-template-rows: repeat(2, auto);
		grid-auto-flow: column;
		justify-content: space-between;
		text-align: center;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5em 4ch;
		padding: 0;
		margin: 0;
	}
</style>
