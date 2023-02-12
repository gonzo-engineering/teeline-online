<script>
	import { outlines } from '../data/outlines/outlines';
	import OutlineCardAnimated from './cards/OutlineCardAnimated.svelte';
	import { findMatchingOutline } from '../scripts/helpers';

	let word = '';

	$: matchingOutline = findMatchingOutline(word, outlines);

	console.log(outlines.filter((outline) => outline.letterGroupings));
</script>

<div class="word-converter-container">
	<input bind:value={word} />
	{#if matchingOutline}
		<OutlineCardAnimated outlineObject={matchingOutline} displayName={false} --width={'50%'} />
	{/if}
</div>

<style>
	.word-converter-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	input {
		font-size: 2rem;
		margin: 2rem;
		text-align: center;
	}
</style>
