<script lang="ts">
	import type { OutlineObject } from '$lib/data/interfaces/interfaces';
	import { prettify } from '$lib/scripts/helpers';
	import { inferPrecedingLinesLength } from '$lib/scripts/line-length-inference';
	import Lines from './Lines.svelte';
	import { speeds } from '$lib/scripts/speed';
	import { user } from '$lib/global-state/global-state.svelte';

	let {
		outlineObject,
		precedingOutlinesLength = 0,
		isStandalone = true,
		drawingSpeed = 750
	}: {
		outlineObject: OutlineObject;
		precedingOutlinesLength?: number;
		isStandalone?: boolean;
		drawingSpeed?: number;
	} = $props();

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
		<Lines
			{line}
			{precedingOutlinesLength}
			previousLinesLength={inferPrecedingLinesLength(outlineObject, index)}
			drawingSpeed={speeds[user.wpm]}
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
