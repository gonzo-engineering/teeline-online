<script lang="ts">
	import WordDisemvoweler from './disemvoweler/wordDisemvoweler.svelte';
	import OutlineCardAnimated from './cards/OutlineCardAnimated.svelte';
	import { findMatchingOutline } from '../scripts/helpers';
	import { disemvowelWord } from '../scripts/disemvowel';
	import type { OutlineObject } from '../data/interfaces/interfaces';

	export let word: string;
	export let outlines: OutlineObject[];

	let wordLetters = disemvowelWord(word).split('');
</script>

<div class="word-converter-container">
	<div>
		<WordDisemvoweler {word} />
	</div>
	<!-- <div class="letters-container">
		{#each wordLetters as letter}
			<OutlineCardAnimated
				outlineObject={findMatchingOutline(letter, outlines)}
				displayName={false}
				--width={100 / wordLetters.length + '%'}
			/>
		{/each}
	</div> -->
	<div>
		<OutlineCardAnimated
			outlineObject={findMatchingOutline(word, outlines)}
			displayName={false}
			--width={'100%'}
		/>
	</div>
</div>

<style>
	.word-converter-container {
		display: flex;
		flex-direction: row;
		/* flex-wrap: wrap; */
		width: 100%;
		column-gap: 3rem;
		align-items: center;
		justify-content: center;
		margin: 5rem auto;
	}
	.letters-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 0 0 5rem 0;
	}
</style>
