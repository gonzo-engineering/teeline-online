<script lang="ts">
	export let precedingOutlinesLength = 0;
	export let outlineObject: OutlineObject;
	export let isStandalone = true;

	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import { prettify } from '../../scripts/helpers';

	const width = 750;
	const margin = 100;
	const horizontal = 460;

	/**
	 * Typical distance between the end of the previous line and the start of the next
	 * We could calculate this precisely from the paths, but it’s probably too much effort.
	 */
	const pause = 60;

	const getPreviousLinesLength = (index: number) =>
		outlineObject.lines
			.slice(0, index)
			.map(({ length }) => length)
			.reduce((a, b) => a + b + pause, 0);

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
			previousLinesLength={getPreviousLinesLength(index)}
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
