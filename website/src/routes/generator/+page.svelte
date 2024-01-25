<script lang="ts">
	import ShorthandPassage from '$lib/ShorthandPassage.svelte';

	let inputText = '';
</script>

<svelte:head>
	<title>Generator | teeline.online</title>
	<meta
		name="description"
		content="Type words and watch them turn into Teeline shorthand outlines before your very eyes."
	/>
</svelte:head>

<div class="container">
	<input
		bind:value={inputText}
		type="text"
		class="search-input search-input-generator"
		placeholder="Construct a word..."
	/>
	<ShorthandPassage text={inputText.trim()} />
</div>

<style>
	.container {
		width: 100%;
		margin: 0 auto;
	}
	.search-input-generator {
		margin: 0 auto;
		display: block;
		margin-bottom: 3rem;
	}
</style>
