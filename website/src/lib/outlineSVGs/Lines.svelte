<script lang="ts">
	import type { LineDetails } from '../../data/interfaces/interfaces';

	export let previousLinesLength = 0;
	export let line: LineDetails;
	/**
	 * The number of SVG units drawn per second.
	 *
	 * For reference, a value of `750` would take one second to draw a straight
	 * line across the entire width of the canvas, and `250` would take 333.3ms.
	 */
	export let drawingSpeed: number = 750;

	/**
	 * Transform an object of into CSS custom properties that can be used
	 * in the `style` attribute. For example, it would turn an object like
	 * `{ colour: 'red', delay: 3 }` into `--colour:red;--delay:3`
	 */
	const getCSSCustomProperties = (properties: Record<string, unknown>) =>
		Object.entries(properties)
			.map(([key, value]) => `--${key}: ${value}`)
			.join(';');
</script>

<g
	style={getCSSCustomProperties({
		length: line.length,
		speed: drawingSpeed,
		delay: `${0.125 + previousLinesLength / drawingSpeed}s`
	})}
>
	<path class="dot" stroke-dasharray="0 {1 + line.length}" d={line.path} />
	<path class="path" stroke-dasharray={line.length} d={line.path} />
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

	:global(.animation-container:hover) :is(.path, .dot) {
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
