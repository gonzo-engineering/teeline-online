<script lang="ts">
	export let precedingOutlinesLength = 0;
	export let outlineObject: OutlineObject;
	export let isStandalone = true;

	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import { prettify } from '../../scripts/helpers';
	import { inferPrecedingLinesLength } from '../../scripts/line-length-inference';

	const width = 750;
	const margin = 100;
	const horizontal = 460;

	const outlineName =
		outlineObject.specialOutlineMeanings.length > 0
			? prettify(outlineObject.specialOutlineMeanings)
			: prettify(outlineObject.letterGroupings);
</script>

<svg viewBox="0 0 750 750">
	<desc>Teeline shorthand outline for '{outlineName}'</desc>
	<line
		x1={isStandalone ? margin : 0}
		x2={isStandalone ? width - margin : width}
		y1={horizontal}
		y2={horizontal}
	/>
	{#each outlineObject.lines as line, index}
		<slot
			{line}
			{index}
			{precedingOutlinesLength}
			previousLinesLength={inferPrecedingLinesLength(outlineObject, index)}
		/>
	{/each}
</svg>

<style>
	svg {
		width: 100%;
		max-height: 400px;
	}

	line {
		stroke: #d3d3d3;
		stroke-width: 5;
	}
</style>
