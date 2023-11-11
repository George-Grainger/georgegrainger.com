<script lang="ts">
	import FooterScene from '$lib/assets/svg/FooterScene.svelte';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	export let duration = 450;

	const { t } = getContext('translations');
</script>

<footer transition:fade={{ duration }}>
	<div class="footer-image"><FooterScene /></div>
	<div class="footer-text-wrapper">
		<div class="footer-text">
			<strong>{$t('global.preferences')}</strong>
			<ul>
				{#each $t('global.footer-links') as { text, link }}
					<li>
						<a href={link}>{text}</a>
					</li>
				{/each}
			</ul>
			<strong>{$t('global.created-by')}</strong>
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
	}

	.footer-text-wrapper {
		color: var(--black);
		background-color: var(--green);

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
