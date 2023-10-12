<script lang="ts">
	import '@fontsource/poppins';
	import '../global.scss';
	import Footer from './Footer.svelte';
	import Nav from './Nav.svelte';
	import Symbols from '$lib/svg/Symbols.svelte';
</script>

<Nav />

<main>
	<slot />
</main>

<Footer />
<Symbols />
