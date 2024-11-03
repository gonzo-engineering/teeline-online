<script lang="ts">
	import OutlineCardAnimated from '$lib/components/cards/OutlineCardAnimated.svelte';
	import type { OutlineObject } from '$lib/data/interfaces/interfaces';
	import { alphabet } from '$lib/data/letter-hierarchy';
	import { findOrCreateOutlineObject } from '$lib/scripts/outline-building/build-outline-objects';
	import { hydratedData } from '$lib/scripts/hydrate-outline-data';

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
		margin-bottom: 2rem;
	}
</style>
