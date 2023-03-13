<script>
	import { outlines } from '../data/outlines/outlines';
	import OutlineCardAnimated from './cards/OutlineCardAnimated.svelte';
	import { findMatchingOutline } from '../scripts/helpers';

	let word = '';
	let emptyOutline = {
		letterGroupings: [],
		specialOutlineMeanings: [],
		lines: [
			{
				path: '',
				translateValues: [0, 0]
			}
		]
	};

	$: matchingOutline = findMatchingOutline(word, outlines);
</script>

<div class="word-converter-container">
	<input class="search-input" placeholder="Search for outlines..." bind:value={word} />
	{#if matchingOutline}
		<OutlineCardAnimated outlineObject={matchingOutline} displayName={false} --width={'50%'} />
	{/if}
	{#if !matchingOutline}
		<OutlineCardAnimated outlineObject={emptyOutline} displayName={false} --width={'50%'} />
	{/if}
</div>

<style>
	.word-converter-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 5rem auto;
	}
	input {
		margin-bottom: 3rem;
	}
</style>
