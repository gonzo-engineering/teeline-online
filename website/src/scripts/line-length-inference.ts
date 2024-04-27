import type { OutlineObject } from '../data/interfaces/interfaces';

/**
 * Typical distance between the end of the previous line and the start of the next
 * We could calculate this precisely from the paths, but it’s probably too much effort.
 */
const pause = 60;

export const inferPrecedingLinesLength = (outline: OutlineObject, index: number) =>
	outline.lines
		.slice(0, index)
		.map(({ length }) => length)
		.reduce((a, b) => a + b + pause, 0);

export const inferPrecedingOutlinesLength = (outlineObjects: OutlineObject[], index: number) =>
	outlineObjects
		.slice(0, index)
		.map(({ lines }) => lines.map(({ length }) => length).reduce((a, b) => a + b + pause, 0))
		.reduce((a, b) => a + b, 0);
