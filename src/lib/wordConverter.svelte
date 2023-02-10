<script>
	import { outlines } from '../data/outlines/outlines';
	import OutlineCardAnimated from './cards/OutlineCardAnimated.svelte';
	import { disemvowelWord } from '../scripts/disemvowel';

	let word = '';
	$: matchingOutlineObject = outlines
		.filter((outline) => outline.letterGrouping)
		.find((outline) => outline.letterGrouping === disemvowelWord(word));

	console.log(outlines.filter((outline) => outline.letterGrouping));
</script>

<div class="word-converter-container">
	<input bind:value={word} />
	{#if matchingOutlineObject}
		<OutlineCardAnimated
			outlineObject={matchingOutlineObject}
			displayName={false}
			--width={'50%'}
		/>
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
