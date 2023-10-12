<script lang="ts">
	export let height: string | number | undefined = undefined;
	export let width: string | number | undefined = undefined;
</script>

<svg {height} {width} viewBox="0 0 80 80">
	<title>French Flag</title>
	<path d="M80 40a40 40 0 1 1-80 0 40 40 0 0 1 80 0Z" fill="var(--white)" />
	<path d="M26 3a40 40 0 0 0 0 74V3Z" fill="var(--blue)" />
	<path d="M54 77a40 40 0 0 0 0-74v74Z" fill="var(--red)" />
</svg>
