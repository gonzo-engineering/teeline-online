<script lang="ts">
	import { createOutlineObject } from '../../lib/outlineSVGs/buildOutline';
	import OutlineCardAnimated from '$lib/cards/OutlineCardAnimated.svelte';

	let inputText = '';
	$: wordsInSearchTerm = inputText.trim().split(' ');
	$: outlineObjects = wordsInSearchTerm.map((word) =>
		createOutlineObject(word, {
			singleOrMultiple: 'single'
		})
	);
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
		bind:value={inputText}
		type="text"
		class="search-input blah"
		placeholder="Construct a word..."
	/>
	<div style="display: flex; gap: 3%; margin: 50px auto;">
		{#each outlineObjects as outlineObject}
			<OutlineCardAnimated {outlineObject} --width={`${100 / outlineObjects.length}%`} />
		{/each}
	</div>
</div>

<style>
	.container {
		width: 100%;
		margin: 0 auto;
	}
	.blah {
		margin: 0 auto;
		display: block;
		margin-bottom: 3rem;
	}
</style>
