<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import OutlineCardAnimated from '$lib/cards/OutlineCardAnimated.svelte';
	import Toggle from '../../lib/toggle.svelte';
	import outlines from '../../data/outlines.json';
	import { findMatchingOutline, sortOutlinesAlphabetically } from '../../scripts/helpers';
	import { disemvowelWord } from '../../scripts/disemvowel';

	let displayedOutlines: OutlineObject[] = outlines;
	let alphabetToggleOn = false;
	let searchTerm = null;

	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

	const lowerCaseAlphabet = alphabet.map((letter) => letter.toLocaleLowerCase());

	let alphabetOutlines = outlines.filter((outline) =>
		lowerCaseAlphabet.some(
			(letter) => outline.letterGroupings && outline.letterGroupings.includes(letter)
		)
	);

	const toggleAlphabetFilter = () => {
		displayedOutlines = alphabetToggleOn ? outlines : alphabetOutlines;
		alphabetToggleOn = alphabetToggleOn ? false : true;

		searchTerm = null;
	};

	const filterOutlines = (outlines: OutlineObject[], searchTerm: string) => {
		if (alphabetToggleOn) {
			displayedOutlines = alphabetOutlines.filter((outline) => {
				return (
					(outline.specialOutlineMeanings &&
						outline.specialOutlineMeanings.join('').includes(searchTerm)) ||
					(outline.letterGroupings && outline.letterGroupings.join('').includes(searchTerm))
				);
			});
		} else {
			displayedOutlines = outlines.filter((outline) => {
				return (
					(outline.specialOutlineMeanings &&
						outline.specialOutlineMeanings.join('').includes(searchTerm)) ||
					(outline.letterGroupings && outline.letterGroupings.join('').includes(searchTerm)) ||
					(outline.letterGroupings && outline.letterGroupings.includes(disemvowelWord(searchTerm)))
				);
			});
		}
	};
</script>

<svelte:head>
	<title>Outlines | teeline.online</title>
	<meta
		name="description"
		content="Browse and search an interactive library of hundreds of animated Teeline shorthand outlines, ranging from the alphabet to special abbreviations."
	/>
</svelte:head>

<div class="filters-container">
	<Toggle toggleLabel={`Only show alphabet`} toggleFunction={toggleAlphabetFilter} />
	<input
		class="search-input"
		placeholder="Search for outlines..."
		bind:value={searchTerm}
		on:input={() => filterOutlines(outlines, searchTerm)}
	/>
</div>

<div class="animated-container">
	{#each sortOutlinesAlphabetically(displayedOutlines) as outlineObject}
		<OutlineCardAnimated {outlineObject} />
	{/each}
</div>

{#if displayedOutlines.length === 0}
	<div class="nothing-found-message">No outlines found matching your search.</div>
{/if}

<style>
	.animated-container {
		display: flex;
		flex-direction: column;
		row-gap: 30px;
	}

	@media (min-width: 1025px) {
		.animated-container {
			display: grid;
			column-gap: 30px;
			grid-template-columns: repeat(6, 1fr);
		}
	}
	.filters-container {
		margin: 0 auto 2rem auto;
		width: max-content;
	}
	.nothing-found-message {
		margin: 10rem auto;
		text-align: center;
		font-size: 1.8rem;
	}
</style>
