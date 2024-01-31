<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import OutlineCardAnimated from '$lib/cards/OutlineCardAnimated.svelte';
	import Toggle from '../../lib/Toggle.svelte';
	import allOutlines from '../../data/outlines.json';
	import { sortOutlinesAlphabetically } from '../../scripts/helpers';
	import { filterAndSortOutlines } from '../../scripts/search';
	import ShorthandPassage from '$lib/ShorthandPassage.svelte';

	let displayedOutlines: OutlineObject[] = sortOutlinesAlphabetically(allOutlines);
	let alphabetToggleOn: boolean = false;
	let searchTerm: string = '';

	const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

	const alphabetOutlines = allOutlines.filter((outline) =>
		alphabet.some((letter) => outline.letterGroupings.includes(letter))
	);

	const toggleAlphabetFilter = () => {
		displayedOutlines = alphabetToggleOn ? allOutlines : alphabetOutlines;
		alphabetToggleOn = !alphabetToggleOn;
		searchTerm = '';
	};
</script>

<svelte:head>
	<title>Dictionary | teeline.online</title>
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
		on:input={() => {
			const outlinesToFilter = alphabetToggleOn ? alphabetOutlines : allOutlines;
			displayedOutlines = filterAndSortOutlines(outlinesToFilter, searchTerm.trim().toLowerCase());
		}}
	/>
</div>

<div class="animated-container">
	{#key displayedOutlines}
		{#each displayedOutlines as outlineObject}
			<OutlineCardAnimated outlineOrWord={outlineObject} />
		{/each}
	{/key}
</div>

{#if displayedOutlines.length === 0}
	<div class="nothing-found-message">
		An exact match for '{searchTerm}' could not be found in the outline dictionary. Here's our best
		guess using the
		<a href="/generator">generator</a>:
	</div>
	<ShorthandPassage text={searchTerm} />
	<div style="width: 50%; margin: auto; text-align: center; padding-top: 2rem;">
		<p>This feature is a work in progress so take results with a grain of salt.</p>
	</div>
{/if}

<style>
	.animated-container {
		display: flex;
		flex-direction: column;
		row-gap: 30px;
	}
	.filters-container {
		margin: 0 auto 2rem auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.nothing-found-message {
		margin: 3rem auto;
		text-align: center;
		font-size: 1.8rem;
		line-height: 1.5;
		max-width: 800px;
	}
	@media (min-width: 1025px) {
		.animated-container {
			display: grid;
			column-gap: 30px;
			grid-template-columns: repeat(6, 1fr);
		}
	}
</style>
