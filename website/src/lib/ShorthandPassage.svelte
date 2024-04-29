<script lang="ts">
	import Container from './outlineSVGs/OutlineSVG.svelte';
	import { convertPassageToOutlines } from '../scripts/build-outline-objects';
	import OutlineDetails from './cards/OutlineDetails.svelte';
	import { hydratedData } from '../scripts/hydrate-outline-data';
	import { inferPrecedingOutlinesLength } from '../scripts/line-length-inference';

	let { text }: { text: string } = $props();

	let outlineObjects = $derived(convertPassageToOutlines(text, hydratedData));
</script>

<div class="animation-container passage-container">
	{#each outlineObjects as outlineObject, i}
		<div>
			<Container
				{outlineObject}
				isStandalone={false}
				precedingOutlinesLength={inferPrecedingOutlinesLength(outlineObjects, i)}
			/>
			<OutlineDetails {outlineObject} />
		</div>
	{/each}
</div>

<style>
	.passage-container {
		display: flex;
		gap: 0;
		margin: 50px auto;
		justify-content: center;
	}
</style>
