<script lang="ts">
	import SVGPathCommander from 'svg-path-commander';
	import type { LineDetails, OutlineObject } from '../../data/interfaces/interfaces';

	export let i: number;
	export let line: LineDetails;
	export let drawingSpeed: number;
	export let parentOutline: OutlineObject;

	const length = Math.ceil(SVGPathCommander.getTotalLength(line.path));

	/**
	 * Typical distance between the end of the previous line and the start of the next
	 * We could calculate this precisely from the paths, but it’s probably too much effort.
	 */
	const pause = 60;

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

<g
	style={Object.entries({
		length,
		speed: drawingSpeed,
		delay: inferAnimationDelay(i, parentOutline.lines, drawingSpeed)
	})
		.map(([key, value]) => `--${key}: ${value}`)
		.join(';')}
	transform="translate({line.translateValues})"
>
	<path class="dot" stroke-dasharray="0 {1 + length}" d={line.path} />
	<path class="path" stroke-dasharray={length} d={line.path} />
</g>

<style>
	g {
		mix-blend-mode: multiply;
	}
	.path {
		stroke-width: 10;
		stroke: currentColor;
	}
	path {
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
	.dot {
		stroke: lightgrey;
		stroke-width: 96;
		stroke-dashoffset: 1;
		animation-fill-mode: none !important;
	}
	:global(.outline-container:hover) :is(.path, .dot) {
		animation-name: dash;
		animation-duration: calc(1s * var(--length) / var(--speed));
		/* This is trying to mimic a hand movement… https://cubic-bezier.com/#.12,0,.84,1 */
		animation-timing-function: cubic-bezier(0.12, 0, 0.84, 1);
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
