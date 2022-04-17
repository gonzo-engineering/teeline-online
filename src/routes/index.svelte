<script>
	import StaticAlphabetTable from '../lib/StaticAlphabetTable.svelte';
	import AnimatedAlphabetTable from '../lib/AnimatedAlphabetTable.svelte';
</script>

<svelte:head>
	<title>Teeline Online</title>
</svelte:head>

<main>
	<AnimatedAlphabetTable />
</main>

<style>
	main {
		margin: 50px 100px;
	}
</style>
