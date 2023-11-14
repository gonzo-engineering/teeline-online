<script lang="ts">
	export let outlineObject: OutlineObject;

	/**
	 * The number of SVG units drawn per second.
	 *
	 * For reference, a value of `750` would take one second to draw a straight
	 * line across the entire width of the canvas, and `250` would take 333.3ms.
	 */
	export let drawingSpeed: number = 750;

	import type { LineDetails, OutlineObject } from '../../data/interfaces/interfaces';
	import { prettify } from '../../scripts/helpers';
	import SVGPathCommander from 'svg-path-commander';

	/**
	 * Typical distance between the end of the previous line and the start of the next
	 * We could calculate this precisely from the paths, but it’s probably too much effort.
	 */
	const pause = 60;

	const outlineName =
		outlineObject.specialOutlineMeanings.length > 0
			? prettify(outlineObject.specialOutlineMeanings)
			: prettify(outlineObject.letterGroupings);

	const inferAnimationDelay = (
		lineIndex: number,
		lineDetailsArray: LineDetails[],
		drawingSpeed: number
	): `${number}s` => {
		const precedingLines = lineDetailsArray.slice(0, lineIndex);
		const precedingLinesCombinedLength = precedingLines
			.map((line) => SVGPathCommander.getTotalLength(line.path))
			.reduce((a, b) => a + b, 0);
		const delayInSeconds =
			0.125 + (precedingLinesCombinedLength + precedingLines.length * pause) / drawingSpeed;
		return `${delayInSeconds}s`;
	};
</script>

<svg viewBox="0 0 750 750">
	<desc>Teeline shorthand outline for '{outlineName}'</desc>
	<path class="line" d="M 80 460 H 650" />
	{#each outlineObject.lines as line, i}
		{@const length = Math.ceil(SVGPathCommander.getTotalLength(line.path))}
		<path
			style={Object.entries({
				length,
				speed: drawingSpeed,
				delay: inferAnimationDelay(i, outlineObject.lines, drawingSpeed)
			})
				.map(([key, value]) => `--${key}: ${value}`)
				.join(';')}
			transform="translate({line.translateValues})"
			class="path"
			stroke-dasharray={length}
			d={line.path}
		/>
	{/each}
</svg>

<style>
	svg {
		width: 100%;
	}

	path {
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

	.line {
		stroke: #d3d3d3;
		stroke-width: 5;
	}

	.path {
		stroke-width: 10;
		stroke: currentColor;
		stroke-dasharray: var(--length);
	}

	:global(.outline-container:hover) .path {
		animation-name: dash;
		animation-duration: calc(1s * var(--length) / var(--speed));
		animation-timing-function: ease-out;
		animation-delay: var(--delay);
		animation-iteration-count: 1;
		animation-fill-mode: both;
	}

	@keyframes dash {
		from {
			stroke-dashoffset: var(--length);
		}
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
