<script>
	import OutlineCardAnimated from '$lib/cards/OutlineCardAnimated.svelte';

	import OutlineCard from '$lib/cards/OutlineCardAnimated.svelte';
	import { outlines } from '../data/outlines/outlines';
	import { sortAlphabetically } from '../helpers';
</script>

<svelte:head>
	<title>Outlines | teeline.online</title>
</svelte:head>

<div class="animated-container">
	{#each sortAlphabetically(outlines) as outlineObject}
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
</style>
