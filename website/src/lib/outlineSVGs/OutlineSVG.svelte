<script lang="ts">
	export let outlineObject: OutlineObject;

	/**
	 * The number of SVG units drawn per second.
	 *
	 * For reference, a value of `750` would take one second to draw a straight
	 * line across the entire width of the canvas, and `250` would take 333.3ms.
	 */
	export let drawingSpeed: number = 750;

	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import { prettify } from '../../scripts/helpers';
	import OutlineSvgGroup from './OutlineSVGGroup.svelte';

	const outlineName =
		outlineObject.specialOutlineMeanings.length > 0
			? prettify(outlineObject.specialOutlineMeanings)
			: prettify(outlineObject.letterGroupings);
</script>

<svg viewBox="0 0 750 750">
	<desc>Teeline shorthand outline for '{outlineName}'</desc>
	<path class="line" d="M 80 460 H 650" />
	{#each outlineObject.lines as line, i}
		<OutlineSvgGroup {i} {line} {drawingSpeed} parentOutline={outlineObject} />
	{/each}
</svg>

<style>
	svg {
		width: 100%;
	}
	.line {
		stroke: #d3d3d3;
		stroke-width: 5;
	}
</style>
