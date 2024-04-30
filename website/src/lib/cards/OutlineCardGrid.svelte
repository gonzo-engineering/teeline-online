<script lang="ts">
	import OutlineCardAnimated from '$lib/cards/OutlineCardAnimated.svelte';
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import { alphabet } from '../../data/letter-hierarchy';
	import { findOrCreateOutlineObject } from '../../scripts/build-outline-objects';
	import { hydratedData } from '../../scripts/hydrate-outline-data';

	let {
		outlines = [],
		wordsAndPhrases = [],
		alphabetMode = false
	}: { outlines?: OutlineObject[]; wordsAndPhrases?: string[]; alphabetMode?: boolean } = $props();

	let displayedOutlines = alphabetMode
		? hydratedData.filter((outline) =>
				alphabet.some((letter) => outline.letterGroupings.includes(letter))
			)
		: outlines.length > 0
			? outlines
			: wordsAndPhrases.map((text) => findOrCreateOutlineObject(text, hydratedData));
</script>

<div class="flex-container">
	{#each displayedOutlines as outlineObject}
		<OutlineCardAnimated outlineOrWord={outlineObject} />
	{/each}
</div>

<style>
	.flex-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		column-gap: 2rem;
		row-gap: 2rem;
	}
</style>
