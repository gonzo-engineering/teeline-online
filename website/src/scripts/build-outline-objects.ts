import specials from '../data/special-outlines.json';
import type { LineDetails, OutlineObject, SpecialOutline } from '../data/interfaces/interfaces';
import { disemvowelWord } from './disemvowel';
import { createStartingObject } from './calculate-starting-point';

const checkedSpecials: SpecialOutline[] = specials;
const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;

export const findOrCreateOutlineObject = (
	word: string,
	outlines: OutlineObject[]
): OutlineObject => {
	// Check if custom special outline exists for word
	const specialOutline = outlines.find((outline) => outline.specialOutlineMeanings.includes(word));
	if (specialOutline) return specialOutline;

	// Check if letter grouping exists for word
	const letterGrouping = outlines.find((outline) =>
		outline.letterGroupings.includes(disemvowelWord(word))
	);
	if (letterGrouping) return letterGrouping;

	// Remove special characters from word
	const cleanedWord = disemvowelWord(word).replace(punctuationRegex, '');
	if (cleanedWord.length === 0) {
		return {
			letterGroupings: [],
			specialOutlineMeanings: [],
			lines: []
		};
	}

	// Check if cleaned word contains any multi-letter groupings
	// If so, return the outline object for the multi-letter grouping and the
	// position of the multi-letter grouping in the word.
	// Keep doing this until no multi-letter groupings are found.

	const findMultiLetterGroupings = (word: string, outlines: OutlineObject[]) => {
		const multiLetterGrouping = outlines.find((outline) =>
			outline.letterGroupings.some((grouping) => word.includes(grouping) && grouping.length > 1)
		);
		if (!multiLetterGrouping) return null;
		const multiLetterGroupingIndex = word.indexOf(
			multiLetterGrouping.letterGroupings.find(
				(grouping) => word.includes(grouping) && grouping.length > 1
			) as string
		);
		return { multiLetterGrouping, multiLetterGroupingIndex };
	};
	console.log(findMultiLetterGroupings(cleanedWord, outlines));

	// Break word into array of letters, find outline object of each letter
	const lettersObjectArray = cleanedWord
		.split('')
		.map((letter) => outlines.find((outline) => outline.letterGroupings.includes(letter)));

	// we need to get the first starting point
	const startingObject = createStartingObject(cleanedWord, lettersObjectArray);

	const letterObjectLines = lettersObjectArray.map((letterObject) => letterObject?.lines);

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

	const specialOutlineMeanings = checkedSpecials.find(
		(outline) => outline.letterGrouping === cleanedWord
	);

	const groupingIsSpecial = specialOutlineMeanings !== undefined;

	// Return new outline object
	return {
		letterGroupings: [cleanedWord],
		specialOutlineMeanings: groupingIsSpecial ? specialOutlineMeanings?.meanings : [],
		lines: combinedLineDetails
	};
};

export const createOutlineObjects = (
	text: string,
	outlineObjects: OutlineObject[]
): OutlineObject[] => {
	// Remove punctuation
	text = text.replace(punctuationRegex, '');
	// TODO: Account for multi-word special outlines
	const wordsInText = text.toLowerCase().split(' ');
	const createdOutlineObjects = wordsInText.map((word) =>
		findOrCreateOutlineObject(word, outlineObjects)
	);
	return createdOutlineObjects;
};
