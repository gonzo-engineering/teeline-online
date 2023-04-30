<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import OutlineCardAnimated from '$lib/cards/OutlineCardAnimated.svelte';
	import Toggle from '../../lib/toggle.svelte';
	import outlines from '../../data/outlines.json';
	import { sortAlphabetically } from '../../scripts/helpers';

	let displayedOutlines: OutlineObject[] = outlines;
	let alphabetToggleOn = false;
	let searchTerm = null;

	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

	const lowerCaseAlphabet = alphabet.map((letter) => letter.toLocaleLowerCase());

	let alphabetOutlines = outlines.filter((outline) =>
		lowerCaseAlphabet.some((letter) => outline.specialOutlineMeanings.includes(letter))
	);

	const toggleAlphabetFilter = () => {
		displayedOutlines = alphabetToggleOn ? outlines : alphabetOutlines;
		alphabetToggleOn = alphabetToggleOn ? false : true;

		searchTerm = null;
	};

	const filterOutlines = (outlines: OutlineObject[], searchTerm: string) => {
		if (alphabetToggleOn) {
			displayedOutlines = alphabetOutlines.filter((outline) =>
				outline.specialOutlineMeanings.join('').includes(searchTerm)
			);
		} else {
			displayedOutlines = outlines.filter((outline) =>
				outline.specialOutlineMeanings.join('').includes(searchTerm)
			);
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
	{#each sortAlphabetically(displayedOutlines) as outlineObject}
		<OutlineCardAnimated {outlineObject} />
	{/each}
</div>

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
			grid-template-columns: repeat(7, 1fr);
		}
	}
	.filters-container {
		margin: 0 auto 2rem auto;
		width: max-content;
	}
</style>
