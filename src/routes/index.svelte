<script>
	import B from '$lib/animated-letters/B.svelte';
	import F from '$lib/animated-letters/F.svelte';

	import AlphabetTable from '../lib/AlphabetTable.svelte';
	import Header from '../lib/Header.svelte';
</script>

<Header />

<main>
	<AlphabetTable />

	<div>
		<h3>And here are a couple of animated outlines - 'b' and 'f'</h3>
		<B />
		<F />
	</div>
</main>

<style>
	main {
		margin: 50px 100px;
	}

	h3 {
		padding-top: 100px;
	}
</style>
