<script>
	import WordDisemvoweler from './disemvoweler/wordDisemvoweler.svelte';
	import OutlineCardAnimated from './cards/OutlineCardAnimated.svelte';
	import { findMatchingOutline } from '../scripts/helpers';
	import { disemvowelWord } from '../scripts/disemvowel';

	export let word;
	export let outlines;

	let wordLetters = disemvowelWord(word).split('');
</script>

<div class="word-converter-container">
	<div>
		<WordDisemvoweler {word} />
	</div>
	<div class="letters-container">
		{#each wordLetters as letter}
			<OutlineCardAnimated
				outlineObject={findMatchingOutline(letter, outlines)}
				displayName={false}
				--width={100 / wordLetters.length + '%'}
			/>
		{/each}
	</div>

	<div>
		<OutlineCardAnimated
			outlineObject={findMatchingOutline(word, outlines)}
			displayName={false}
			--width={'50%'}
		/>
	</div>
</div>

<style>
	.word-converter-container {
		display: flex;
		flex-direction: column;
		/* flex-wrap: wrap; */
		width: 100%;
		margin: 5rem auto;
	}
	.letters-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 0 0 5rem 0;
	}
</style>
