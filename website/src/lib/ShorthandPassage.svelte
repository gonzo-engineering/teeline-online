<script lang="ts">
	import Container from './outlineSVGs/OutlineSVG.svelte';
	import Lines from './outlineSVGs/Lines.svelte';
	import { convertPassageToOutlines } from '../scripts/build-outline-objects';
	import OutlineDetails from './cards/OutlineDetails.svelte';
	import type { OutlineObject } from '../data/interfaces/interfaces';
	import { hydratedData } from '../scripts/hydrate-outline-data';

	export let text: string;
	$: outlineObjects = convertPassageToOutlines(text, hydratedData);

	const getPrecedingOutlinesLength = (outlineObjects: OutlineObject[], index: number) =>
		outlineObjects
			.slice(0, index)
			.map(({ lines }) => lines.map(({ length }) => length).reduce((a, b) => a + b + 60, 0))
			.reduce((a, b) => a + b, 0);
</script>

<div class="animation-container passage-container">
	{#each outlineObjects as outlineObject, i}
		<div>
			<Container {outlineObject} isStandalone={false} let:line let:previousLinesLength>
				<Lines
					{line}
					precedingOutlinesLength={getPrecedingOutlinesLength(outlineObjects, i)}
					{previousLinesLength}
					drawingSpeed={900}
				/>
			</Container>
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
