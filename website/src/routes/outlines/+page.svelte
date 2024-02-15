<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import Toggle from '../../lib/Toggle.svelte';
	import { filterAndSortOutlines } from '../../scripts/search';
	import ShorthandPassage from '$lib/ShorthandPassage.svelte';
	import { hydratedData } from '../../scripts/hydrate-outline-data';
	import { alphabet } from '../../data/letter-hierarchy';
	import OutlineCardGrid from '$lib/cards/OutlineCardGrid.svelte';

	let displayedOutlines: OutlineObject[] = hydratedData;
	let alphabetToggleOn: boolean = false;
	let searchTerm: string = '';

	const alphabetOutlines = hydratedData.filter((outline) =>
		alphabet.some((letter) => outline.letterGroupings.includes(letter))
	);

	const toggleAlphabetFilter = () => {
		displayedOutlines = alphabetToggleOn ? hydratedData : alphabetOutlines;
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
			const outlinesToFilter = alphabetToggleOn ? alphabetOutlines : hydratedData;
			displayedOutlines = filterAndSortOutlines(outlinesToFilter, searchTerm.trim().toLowerCase());
		}}
	/>
</div>

{#if searchTerm.length > 0 && displayedOutlines.length > 0}
	<div class="search-subheading">
		Matches found for <span class="search-term">'{searchTerm}'</span>
	</div>
{/if}

{#key displayedOutlines}
	<OutlineCardGrid outlines={displayedOutlines} />
{/key}

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
	.filters-container {
		margin: 0 auto 2rem auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.search-subheading {
		font-size: 1.8rem;
		margin: 2rem auto;
	}
	.search-term {
		font-weight: 700;
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
