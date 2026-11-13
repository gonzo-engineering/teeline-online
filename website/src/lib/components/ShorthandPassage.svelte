<script lang="ts">
	import Container from './outlineSVGs/OutlineSVG.svelte';
	import { convertPassageToOutlines } from '#lib/scripts/outline-building/build-outline-objects.ts';
	import OutlineDetails from './cards/OutlineDetails.svelte';
	import { hydratedData } from '#lib/scripts/hydrate-outline-data.ts';
	import { inferPrecedingOutlinesLength } from '#lib/scripts/line-length-inference.ts';

	let { text, showMeanings }: { text: string; showMeanings: boolean } = $props();

	let outlineObjects = $derived(convertPassageToOutlines(text, hydratedData));
</script>

<div class="animation-container passage-container">
	{#each outlineObjects as outlineObject, i}
		<div class="outline">
			<Container
				{outlineObject}
				isStandalone={false}
				precedingOutlinesLength={inferPrecedingOutlinesLength(outlineObjects, i)}
			/>
			{#if showMeanings}
				<OutlineDetails {outlineObject} />
			{/if}
		</div>
	{/each}
</div>

<style>
	.passage-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0;
		margin: 50px auto;
		max-width: 1300px;
	}
	.outline {
		max-width: 100px;
	}
	@media (min-width: 768px) {
		.outline {
			max-width: 150px;
		}
	}
</style>
