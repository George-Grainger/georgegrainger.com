<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import Option from '$lib/components/Option.svelte';
	import Select from '$lib/components/Select.svelte';
	import { motion } from '$lib/stores/motion';
	import AnimationIcon from '$lib/svg/AnimationIcon.svelte';
	import FranceFlag from '$lib/svg/flags/FranceFlag.svelte';
	import UkFlag from '$lib/svg/flags/UKFlag.svelte';
</script>

<nav aria-label="Main">
	<ul class="links">
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/projects">Projects</a>
		</li>
		<li>
			<a href="/about">About</a>
		</li>
	</ul>
	<ul class="settings">
		<li>
			<ThemeToggle height="2.25em" />
		</li>
		<li>
			<Select id="motion-select" referBy="Motion Preference" updates={$motion}>
				<Option value={motion.NO_PREFERENCE}>
					<span>Keep Animations</span>
					<AnimationIcon height="1.5em" />
				</Option>
				<Option value={motion.REDUCE}>
					<span>Reduce Animations</span>
					<AnimationIcon height="1.5em" disabled={true} />
				</Option>
			</Select>
		</li>
		<li>
			<Select id="language-select" referBy="Language" updates={$motion}>
				<Option value={motion.NO_PREFERENCE}>
					<UkFlag />
					<span>En</span>
				</Option>
				<Option value={motion.REDUCE}>
					<FranceFlag />
					<span>Fr</span>
				</Option>
			</Select>
		</li>
	</ul>
	<button class="hamburger">
		<svg viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M4 18q-.425 0-.713-.288T3 17q0-.425.288-.713T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18H4Zm0-5q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13H4Zm0-5q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8H4Z"
			/>
		</svg>
	</button>
</nav>

<style lang="scss">
	nav[aria-label='Main'] {
		--_size: 0.3em;
		--_border-size: 0.125em;
		--_svg-height: 1.8em;

		display: flex;
		justify-content: space-between;
		gap: 1rem;

		font-weight: 600;
		font-size: clamp(1.125rem, 3.5vw, 1.375rem);

		margin: 1rem auto;
		width: min(100vw - 2rem, var(--page-width));

		top: 1rem;
		position: sticky;
		z-index: 9;
	}

	ul {
		display: contents;
	}

	.links {
		display: none;
	}

	li {
		display: flex;
		align-items: center;
	}

	a {
		text-decoration: none;
	}

	.hamburger {
		--_size: 0.15em;

		display: flex;
		align-items: center;
		font-size: var(--_select-fs);
		border: var(--_border-size) solid currentColor;
		border-radius: var(--border-radius);
		background-color: var(--inverse);
		padding: calc(0.5 * var(--_size)) var(--_size);
	}

	:global([data-wraps='language-select']) {
		--_size: 0.15em;
	}

	:global([aria-controls='motion-select'] span),
	:global([aria-controls='language-select'] span) {
		display: none;
	}

	.hamburger svg,
	:global([data-wraps='language-select'] svg) {
		height: var(--_svg-height);
	}

	@media only screen and (width > 40rem) {
		nav[aria-label='Main'] {
			--_svg-height: 1.5em;
		}

		:global([aria-controls='motion-select'] span) {
			display: inherit;
		}

		:global([aria-controls='motion-select'] svg) {
			display: none;
		}
	}

	@media only screen and (width > 60rem) {
		nav[aria-label='Main'] {
			--_size: 0.4em;
		}

		.links {
			display: contents;
		}

		.hamburger {
			display: none;
		}
	}
</style>
