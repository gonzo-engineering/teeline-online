<script>
	import OutlineCard from '$lib/OutlineCard.svelte';
	import { outlines } from '../../data/outlines/outlines';

	const alphabeticalOutlines = outlines.sort(function (a, b) {
		var textA = a.name[0].toUpperCase();
		var textB = b.name[0].toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});

	console.log(alphabeticalOutlines);
</script>

<svelte:head>
	<title>Outlines | teeline.online</title>
</svelte:head>

<div class="animated-container">
	{#each outlines as outline}
		<OutlineCard {outline} />
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
