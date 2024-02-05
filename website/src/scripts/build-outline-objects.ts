import allOutlines from '../data/outlines.json';
import type { LineDetails, OutlineObject } from '../data/interfaces/interfaces';
import { disemvowelWord } from './disemvowel';
import { createStartingObject } from './calculate-starting-point';

const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;

export const createOutlineObjects = (text: string): OutlineObject[] => {
	// Remove punctuation
	text = text.replace(punctuationRegex, '');
	// TODO: Account for multi-word special outlines
	const wordsInText = text.toLowerCase().split(' ');
	const outlineObjects = wordsInText.map((word) => findOrCreateOutlineObject(word, allOutlines));
	return outlineObjects;
};

export const findOrCreateOutlineObject = (
	word: string,
	outlines: OutlineObject[]
): OutlineObject => {
	// Check if special outline exists for word
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
	const lettersObjectArray = lettersArray.map((letter) =>
		outlines.find((outline) => outline.letterGroupings.includes(letter))
	);

	const startingObject = createStartingObject(cleanedWord, lettersObjectArray);

	const letterObjectLines = lettersObjectArray.map((outline) => outline.lines);

	const { combinedLineDetails } = letterObjectLines.reduce<{
		combinedLineDetails: LineDetails[];
		x: number;
		y: number;
	}>(({ combinedLineDetails, x, y }, lines) => {
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
	}, startingObject);

	// Return new outline object
	return {
		letterGroupings: [cleanedWord],
		specialOutlineMeanings: [],
		lines: combinedLineDetails
	};
};
