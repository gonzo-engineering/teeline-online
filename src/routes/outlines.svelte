<script>
	import OutlineCardAnimated from '$lib/cards/OutlineCardAnimated.svelte';
	import { outlines } from '../data/outlines/outlines';
	import { sortAlphabetically } from '../helpers';

	let displayedOutlines = outlines;
	let alphabetToggleOn = false;

	const alphabet = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z'
	];

	const lowerCaseAlphabet = alphabet.map((letter) => letter.toLocaleLowerCase());

	function filterOutlines() {
		displayedOutlines = alphabetToggleOn
			? outlines
			: outlines.filter((outline) =>
					lowerCaseAlphabet.some((letter) => outline.name.includes(letter))
			  );
		alphabetToggleOn = alphabetToggleOn ? false : true;
	}
</script>

<svelte:head>
	<title>Outlines | teeline.online</title>
</svelte:head>

<div class="filters-container">
	<div class="filter-label">Only show alphabet</div>
	<label class="switch">
		<input type="checkbox" on:click={filterOutlines} />
		<span class="slider round" />
	</label>
</div>

<div class="animated-container">
	{#each sortAlphabetically(displayedOutlines) as outlineObject}
		<OutlineCardAnimated {outlineObject} />
	{/each}
</div>

<style>
	.animated-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-column-gap: 30px;
		grid-row-gap: 30px;
	}

	@media (min-width: 1025px) {
		.animated-container {
			grid-template-columns: repeat(7, 1fr);
		}
	}
	.filters-container {
		margin: 0 auto 2rem auto;
		width: max-content;
	}
	.filter-label {
		margin-right: 1rem;
		display: inline-block;
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
