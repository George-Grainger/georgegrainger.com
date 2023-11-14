<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { crossfade, fade, fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';
	import { z } from 'zod';

	export let data;

	let submissionStatus = '';
	const newContact = z.object({
		name: z.string().min(2),
		email: z.string().email(),
		message: z.string().min(10)
	});

	const { form, errors, enhance } = superForm(data.form, {
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

	const [send, receive] = crossfade({
		duration: 200
	});
</script>

<section>
	<h1>Get in touch</h1>

	{#if submissionStatus === 'failed'}
		<div in:fly={{ duration: 200, delay: 200, y: 5 }} out:fly={{ duration: 200, y: -5 }}>
			<h2>Submission Failed</h2>
			<p>Hmm... something went wrong. Sorry about that - it's probably my fault.</p>
			<p>
				It's probably easier if you <a href="mailto:georgegrainger2000@gmail.com"
					>email me directly</a
				>, it all ends up there anyway!
			</p>
			<p>If you'd prefer to use the form, you can retry by clicking below</p>
			<Button on:click={() => (submissionStatus = '')}>Retry</Button>
		</div>
	{:else if submissionStatus === 'success'}
		<div in:fly={{ duration: 200, delay: 200, y: 5 }} out:fly={{ duration: 200, y: -5 }}>
			<h2>Success</h2>
			<p>Thanks for getting in touch, I'll get back to you as soon as I can</p>
			<p>
				For now, feel free to keep looking round - if you think of anything else to say you can
				always resubmit below using the button below.
			</p>
			<Button data-sveltekit-reload on:click={() => (submissionStatus = '')}>
				Send another message
			</Button>
		</div>
	{:else}
		<div in:fly={{ duration: 200, delay: 200, y: 5 }} out:fly={{ duration: 200, y: -5 }}>
			<p>If you're interested, fill in the form below and I'll be sure to get back to you.</p>
			<p>
				Alternatively, you can <a href="mailto:georgegrainger2000@gmail.com">email me directly</a>
				or reach out to me on
				<a
					href="https://www.linkedin.com/in/georgegrainger/"
					target="_blank"
					rel="noopener noreferrer"
				>
					LinkedIn.
				</a>
			</p>
			<form method="POST" use:enhance>
				<div class={$errors.name ? 'error' : ''}>
					<label for="name">Your name:</label>
					{#if $errors.name}
						<small class="text-error">
							<span class="sr-only">Error: </span>{$errors.name}
						</small>
					{/if}
					<input
						bind:value={$form.name}
						type="text"
						name="name"
						aria-label="name"
						placeholder="John Doe"
						required
						autocomplete="off"
					/>
				</div>

				<div class={$errors.email ? 'error' : ''}>
					<label for="email">Your email:</label>
					{#if $errors.email}
						<small class="text-error">
							<span class="sr-only">Error: </span>{$errors.email}
						</small>
					{/if}
					<input
						bind:value={$form.email}
						type="email"
						name="email"
						aria-label="email"
						placeholder="example@gmail.com"
						required
						autocomplete="off"
					/>
				</div>

				<div class={`message ${$errors.message ? 'error' : ''}`}>
					<label for="message" class="Your Message:">Message:</label>
					{#if $errors.message}
						<small class="text-error">
							<span class="sr-only">Error: </span>{$errors.message}
						</small>
					{/if}
					<textarea
						bind:value={$form.message}
						name="message"
						aria-label="message"
						placeholder="Message"
						required
						rows="3"
						autocomplete="off"
					/>
				</div>

				<div class="submit-content">
					{#if submissionStatus === 'submitting'}
						<p class="submitting">Submitting...</p>
					{:else}
						<Button type="submit">Send Message</Button>
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

	textarea {
		min-height: 3rem;
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
