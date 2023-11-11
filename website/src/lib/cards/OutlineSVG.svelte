<script lang="ts">
	import type { LineDetails, OutlineObject } from '../../data/interfaces/interfaces';
	export let outlineObject: OutlineObject;
	import { prettify } from '../../scripts/helpers';

	const outlineName =
		outlineObject.specialOutlineMeanings.length > 0
			? prettify(outlineObject.specialOutlineMeanings)
			: prettify(outlineObject.letterGroupings);

	const inferPathLength = (pathString: string) => {
		const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		svgPath.setAttribute('d', pathString);
		return Math.floor(svgPath.getTotalLength());
	};

	const inferAnimationDelay = (lineIndex: number, lineDetailsArray: LineDetails[]) => {
		if (lineIndex === 0) return 0;
		const precedingLines = lineDetailsArray.slice(0, lineIndex);
		const precedingLinesCombinedLength = precedingLines
			.map((line) => inferPathLength(line.path))
			.reduce((a, b) => a + b, 0);
		const delayInSeconds = precedingLinesCombinedLength / 500;
		return delayInSeconds;
	};
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	width="100%"
	viewBox="0 0 750 750"
>
	<desc>Teeline shorthand outline for '{outlineName}'</desc>
	<path
		id="shape0"
		transform="translate(0, 458.461538461538)"
		fill="#D3D3D3"
		fill-rule="evenodd"
		stroke="#D3D3D3"
		stroke-width="5"
		stroke-linecap="round"
		stroke-linejoin="miter"
		stroke-miterlimit="2"
		d="M 80 1 C 279.658 0.6508 522.393 0.3254 650 1"
	/>
	{#each outlineObject.lines as line, i}
		<path
			class={$$props.class}
			transform="translate({line.translateValues})"
			fill="none"
			stroke="#000000"
			stroke-width="10"
			stroke-linecap="round"
			stroke-linejoin="round"
			style="animation-delay: {inferAnimationDelay(i, outlineObject.lines)}s"
			d={line.path}
		/>
	{/each}
</svg>
