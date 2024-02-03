import lettersAndLetterGroupings from './outlines.json';
import specialOutlines from './special-outlines.json';
import type { LineDetails, OutlineObject } from './interfaces/interfaces';
import { disemvowelWord } from '../scripts/disemvowel';

export const findOrCreateOutlineObject = (
	word: string,
	outlines: OutlineObject[]
): OutlineObject => {
	// Check if custom special outline exists for word
	const specialOutline = outlines.find((outline) => outline.specialOutlineMeanings.includes(word));
	if (outlines.find((outline) => outline.specialOutlineMeanings.includes(word))) {
		return specialOutline;
	}
	// Check if letter grouping exists for word
	const letterGrouping = outlines.find((outline) =>
		outline.letterGroupings.includes(disemvowelWord(word))
	);
	if (letterGrouping) {
		return letterGrouping;
	}
	// Remove special characters from word
	const cleanedWord = disemvowelWord(word).replace(/[^a-zA-Z]/g, '');
	if (cleanedWord.length === 0) {
		return {
			letterGroupings: [],
			specialOutlineMeanings: [],
			lines: []
		};
	}
	// Break word into array of letters
	const lettersArray = cleanedWord.split('');
	// Find outline object of each letter
	const lettersObjectArray = lettersArray
		.map((letter) => outlines.find((outline) => outline.letterGroupings.includes(letter)))
		.map(({ lines }) => lines);

	// we need to get the first starting point
	const { x = 0, y = 0 } = lettersObjectArray[0]?.[0]?.start ?? {};

	const { combinedLineDetails } = lettersObjectArray.reduce<{
		combinedLineDetails: LineDetails[];
		x: number;
		y: number;
	}>(
		({ combinedLineDetails, x, y }, lines) => {
			const [first, ...rest] = lines;
			const last = rest.at(-1) ?? first;

			const offsetLines = lines.map((line) => {
				const dx = line.start.x - first.start.x;
				const dy = line.start.y - first.start.y;
				const path = line.path.replace(/M[\d\.]+( |,)[\d\.]+/, `M${x + dx} ${y + dy}`);
				// console.log({ then: line.path, now: path });
				return { ...line, path };
			});

			combinedLineDetails.push(...offsetLines);

			return {
				combinedLineDetails,
				x: x + last.end.x - first.start.x,
				y: y + last.end.y - first.start.y
			};
		},
		{
			combinedLineDetails: [],
			x,
			y
		}
	);

	const specialOutlineMeanings = specialOutlines.find((outline) =>
		outline.letterGrouping.includes(cleanedWord)
	);

	const groupingIsSpecial = specialOutlineMeanings !== undefined;

	// Return new outline object
	return {
		letterGroupings: [cleanedWord],
		specialOutlineMeanings: groupingIsSpecial ? [specialOutlineMeanings?.meaning] : [],
		lines: combinedLineDetails
	};
};

const specialOutlineObjects = specialOutlines.map((specialOutline) =>
	findOrCreateOutlineObject(specialOutline.letterGrouping, lettersAndLetterGroupings)
);

export const allOutlines: OutlineObject[] = [
	...lettersAndLetterGroupings,
	...specialOutlineObjects
];
