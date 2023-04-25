<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import OutlineCardAnimated from '$lib/cards/OutlineCardAnimated.svelte';
	import { outlines } from '../../data/outlines/outlines';
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
	<div class="filter-label">Only show alphabet</div>
	<label class="switch">
		<input type="checkbox" on:click={toggleAlphabetFilter} />
		<span class="slider round" />
	</label>
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
	.filter-label {
		margin-right: 0.5rem;
		display: inline-block;
		font-size: 1.8rem;
	}
	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: black;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px black;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
