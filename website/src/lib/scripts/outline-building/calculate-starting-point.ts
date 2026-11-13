import { dominantConsonants, passiveConsonants } from '#lib/data/letter-hierarchy.ts';
import type { OutlineObject } from '#lib/data/interfaces/interfaces.ts';
import { getDetachmentOffset } from './detached-letters';

const OUTLINE_CANVAS_WIDTH = 750;

// Index of the first *grouping* containing a dominant consonant, falling back
// to the first containing a passive one. Working in groupings rather than
// characters keeps the index aligned with lettersObjectArray when a word
// contains blends like 'fr'.
const findAnchorIndex = (groupings: string[]) => {
	for (const consonants of [dominantConsonants, passiveConsonants]) {
		const index = groupings.findIndex((grouping) =>
			grouping.split('').some((letter) => consonants.includes(letter))
		);
		if (index !== -1) return index;
	}
	return -1;
};

export const createStartingObject = (groupings: string[], lettersObjectArray: OutlineObject[]) => {
	const anchorIndex = findAnchorIndex(groupings);

	// No dominant or passive consonant: start where the first outline naturally starts
	if (anchorIndex === -1) {
		const { x = 0, y = 0 } = lettersObjectArray[0].lines[0].start;
		return { combinedLineDetails: [], x, y };
	}

	// The anchor grouping's own outline data is already positioned correctly
	// relative to the line, so use its start directly — this works for blends
	// like 'fr' as well as single letters
	let { y } = lettersObjectArray[anchorIndex].lines[0].start;

	// Work backwards from the anchor to the start of the word, undoing each
	// preceding letter's travel and any detachment gap before the next letter
	for (let i = anchorIndex; i > 0; i--) {
		const offset = getDetachmentOffset(groupings[i], groupings[i - 1]);
		const lines = lettersObjectArray[i - 1].lines;
		const first = lines[0];
		const last = lines.at(-1) ?? first;
		y -= (offset?.y ?? 0) + (last.end.y - first.start.y);
	}

	// Centre the word horizontally
	const outlineWidth = lettersObjectArray.reduce((width, letterObject, i) => {
		const lastLine = letterObject.lines.at(-1);
		const offset = getDetachmentOffset(groupings[i], groupings[i - 1]);
		return width + (lastLine ? lastLine.end.x - lastLine.start.x : 0) + (offset?.x ?? 0);
	}, 0);
	const x = OUTLINE_CANVAS_WIDTH / 2 - outlineWidth / 2;

	return { combinedLineDetails: [], x, y };
};
