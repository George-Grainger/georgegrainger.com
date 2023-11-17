<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { t } from '$lib/translations/index.js';
	import { onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';
	import { z } from 'zod';

	export let data;

	let submissionStatus = '';
	const newContact = z.object({
		name: z.string().min(2, $t('contact.name-error')),
		email: z.string().email($t('contact.email-error')),
		message: z.string().min(10, $t('contact.message-error'))
	});

	const { form, errors, constraints, enhance, reset } = superForm(data.form, {
		validators: newContact,
		resetForm: true,
		onSubmit: () => {
			submissionStatus = 'submitting';
		},
		onError: () => {
			submissionStatus = 'failed';
		},
		onUpdated: () => {
			submissionStatus = 'success';
		}
	});

	// Prevent error when navigating on half filled form
	let section: HTMLElement;
	onNavigate((e) => {
		if (e.to?.route.id?.endsWith('/contact')) {
			return;
		} else if ($form.name || $form.email || $form.message) {
			reset();
			section.parentNode?.removeChild(section);
		}
	});

	// If there's an error disable the button
	$: disabled = Object.values($errors).every((v) => v == undefined) ? null : 'disabled';
</script>

<section bind:this={section}>
	<h1>{$t('contact.title')}</h1>

	{#if submissionStatus === 'failed'}
		<div in:fly={{ duration: 200, delay: 200, y: 5 }} out:fly={{ duration: 200, y: -5 }}>
			<h2>{$t('contact.failed-title')}</h2>
			{#each $t('contact.failed-paragraphs') as paragraph}
				<p>{@html paragraph}</p>
			{/each}
			<Button on:click={() => (submissionStatus = '')}>{$t('contact.failed-cta')}</Button>
		</div>
	{:else if submissionStatus === 'success'}
		<div in:fly={{ duration: 200, delay: 200, y: 5 }} out:fly={{ duration: 200, y: -5 }}>
			<h2>{$t('contact.success-title')}</h2>
			{#each $t('contact.success-paragraphs') as paragraph}
				<p>{@html paragraph}</p>
			{/each}
			<Button data-sveltekit-reload on:click={() => (submissionStatus = '')}>
				{$t('contact.success-cta')}
			</Button>
		</div>
	{:else}
		<div in:fly={{ duration: 200, delay: 200, y: 5 }} out:fly={{ duration: 200, y: -5 }}>
			{#each $t('contact.form-paragraphs') as paragraph}
				<p>{@html paragraph}</p>
			{/each}
			<form method="POST" use:enhance data-sveltekit-reload>
				<div class={$errors.name ? 'error' : ''}>
					<label for="name">{$t('contact.your-name')}</label>
					{#if $errors.name}
						<small class="text-error">
							<span class="sr-only">{$t('contact.error')}</span>{$errors.name}
						</small>
					{/if}
					<input
						bind:value={$form.name}
						type="text"
						name="name"
						aria-label="name"
						aria-invalid={$errors.name ? 'true' : undefined}
						placeholder="John Doe"
						autocomplete="off"
						{...$constraints.name}
					/>
				</div>

				<div class={$errors.email ? 'error' : ''}>
					<label for="email">{$t('contact.your-email')}</label>
					{#if $errors.email}
						<small class="text-error">
							<span class="sr-only">{$t('contact.error')}</span>{$errors.email}
						</small>
					{/if}
					<input
						bind:value={$form.email}
						type="email"
						name="email"
						aria-label="email"
						aria-invalid={$errors.email ? 'true' : undefined}
						placeholder="example@gmail.com"
						autocomplete="off"
						{...$constraints.email}
					/>
				</div>

				<div class={`message ${$errors.message ? 'error' : ''}`}>
					<label for="message" class="Your Message:">{$t('contact.message')}</label>
					{#if $errors.message}
						<small class="text-error">
							<span class="sr-only">{$t('contact.error')}</span>{$errors.message}
						</small>
					{/if}
					<textarea
						bind:value={$form.message}
						name="message"
						aria-label="message"
						aria-invalid={$errors.message ? 'true' : undefined}
						placeholder={$t('contact.message-prompt')}
						rows="5"
						autocomplete="off"
						{...$constraints.message}
					/>
				</div>

				<div class="submit-content">
					{#if submissionStatus === 'submitting'}
						<p class="submitting">{$t('contact.submitting')}</p>
					{:else}
						<Button type="submit" {disabled}>{$t('contact.form-cta')}</Button>
					{/if}
				</div>
			</form>
		</div>
	{/if}
</section>

<style lang="scss">
	section :global(.btn) {
		margin-top: 2rem;
	}

	h2 {
		margin-top: 1rem;
	}

	form {
		display: grid;
		gap: 1rem 4rem;
		margin-top: 1rem;
	}

	div {
		position: relative;
		display: grid;
		gap: 0.125em;
		align-content: end;
	}

	div.error::before {
		content: '';
		position: absolute;
		background-color: var(--red);
		inset: 0.5rem auto 0 -1.5rem;
		width: 0.5rem;
		border-radius: var(--border-radius);
	}

	input:not([type='submit']),
	textarea {
		font-family: inherit;
		font-size: 0.75em;
		padding: 0.25em;
		background-color: var(--card);
		color: var(--text-inverse);
		border: 0.15rem solid var(--text);
		border-radius: var(--border-radius);
	}

	input[type='text'],
	input[type='email'],
	textarea,
	label,
	small {
		padding: 0.5rem;
	}

	label {
		font-size: 1.2em;
		font-weight: 600;
	}

	small {
		margin-top: -0.75rem;
	}

	.submitting {
		margin: auto;
		font-weight: 600;
	}

	p + p {
		margin-top: 0.5rem;
	}

	@media only screen and (width > 60rem) {
		.message,
		.submit-content {
			grid-column: span 2;
		}
	}
</style>
