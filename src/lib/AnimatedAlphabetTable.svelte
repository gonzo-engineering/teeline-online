<script>
	import { outlines } from '../data/outlines/outlines';
	import OutlineCard from './OutlineCard.svelte';

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
</script>

<div class="animated-container">
	{#each outlines as outline}
		{#if lowerCaseAlphabet.some((el) => outline.name.includes(el))}
			<OutlineCard {outline} />
		{/if}
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
</style>
