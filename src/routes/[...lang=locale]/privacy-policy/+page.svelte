<script>
	export let data;
</script>

<svelte:head>
	<title>{data.title} - George Grainger</title>
</svelte:head>

<section class="prose">
	<h1>{data.title}</h1>

	{#key data}
		<svelte:component this={data.content} />
	{/key}
</section>
