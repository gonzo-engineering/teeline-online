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
		placeholder="Generate outlines..."
	/>
	<ShorthandPassage text={inputText.trim().toLowerCase()} />
	<div style="width: 50%; margin: auto; text-align: center;">
		<p>This feature is a work in progress so take results with a grain of salt.</p>
	</div>
</div>

<style>
	.container {
		width: 100%;
		margin: 0 auto;
		padding-top: 2rem;
	}
	.search-input-generator {
		margin: 0 auto;
		display: block;
		margin-bottom: 3rem;
	}
</style>
