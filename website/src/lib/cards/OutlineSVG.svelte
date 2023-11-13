<script lang="ts">
	export let outlineObject: OutlineObject;
	export let animationSpeedInSecs: number = 1;

	import type { LineDetails, OutlineObject } from '../../data/interfaces/interfaces';
	import { prettify } from '../../scripts/helpers';
	import SVGPathCommander from 'svg-path-commander';

	const outlineName =
		outlineObject.specialOutlineMeanings.length > 0
			? prettify(outlineObject.specialOutlineMeanings)
			: prettify(outlineObject.letterGroupings);

	const inferAnimationDelay = (
		lineIndex: number,
		lineDetailsArray: LineDetails[],
		animationSpeed: number
	) => {
		if (lineIndex === 0) return 0;

		const precedingLines = lineDetailsArray.slice(0, lineIndex);
		const precedingLinesCombinedLength = precedingLines
			.map((line) => SVGPathCommander.getTotalLength(line.path))
			.reduce((a, b) => a + b, 0);
		const delayInSeconds = (precedingLinesCombinedLength / 900) * animationSpeed;
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
			style="animation-delay: {inferAnimationDelay(i, outlineObject.lines, animationSpeedInSecs)}s"
			d={line.path}
		/>
	{/each}
</svg>
