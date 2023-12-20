<script lang="ts">
	import { createOutlineObject } from '../../lib/outlineSVGs/buildOutline';
	import { disemvowelWord } from '../../scripts/disemvowel';
	import OutlineCardAnimated from '$lib/cards/OutlineCardAnimated.svelte';

	let searchTerm = '';
	$: disemvoweledSearchTerm = disemvowelWord(searchTerm);
	$: outlineObject = createOutlineObject(disemvoweledSearchTerm, {
		singleOrMultiple: 'single'
	});
</script>

<svelte:head>
	<title>Builder | teeline.online</title>
	<meta
		name="description"
		content="Type words and watch them turn into Teeline shorthand outlines before your very eyes."
	/>
</svelte:head>

<div class="container">
	<input
		bind:value={searchTerm}
		type="text"
		class="search-input blah"
		placeholder="Construct a word..."
	/>
	<OutlineCardAnimated {outlineObject} displayName={true} />
</div>

<style>
	.container {
		width: 500px;
		margin: 0 auto;
	}
	.blah {
		margin: 0 auto;
		display: block;
		margin-bottom: 3rem;
	}
</style>
