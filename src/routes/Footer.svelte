<script lang="ts">
	import FooterScene from '$lib/assets/svg/FooterScene.svelte';
</script>

<footer>
	<div class="footer-image"><FooterScene /></div>
	<div class="footer-text-wrapper">
		<div class="footer-text">
			<strong>Preferences</strong>
			<ul>
				<li>
					<a href="/">Language</a>
				</li>
				<li>
					<a href="/">Theme</a>
				</li>
				s
				<li>
					<a href="/">Accessibility</a>
				</li>
			</ul>
			<strong>Created By</strong>
			<span>George Grainger</span>
		</div>
	</div>
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

	.footer-text-wrapper {
		color: var(--black);
		background-color: hsl(117, 36%, 49%);
		transition: background-color var(--duration) var(--transition);
		padding-bottom: 1rem;
		margin-top: -1rem;
		z-index: 1;
	}

	.footer-text {
		display: grid;
		gap: 0.25em;
		grid-template: repeat(2, auto) / repeat(2, auto);
		grid-auto-flow: column;
		place-content: space-between;

		margin: auto;
		width: var(--page-width);

		ul {
			display: flex;
			gap: 0.5em 4ch;
		}
	}

	.footer-image {
		position: relative;
		display: flex;
		justify-content: center;
	}

	:global([data-theme='dark']) {
		.footer-text-wrapper {
			background-color: hsl(227, 23%, 88%);
		}
	}

	@media only screen and (width <= 60rem) {
		.footer-text {
			text-align: center;

			ul {
				display: grid;
			}
		}
	}
</style>
