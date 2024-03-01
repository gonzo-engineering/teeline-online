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

	// Find matching letter or letter grouping at start of word until no more letters
	const turnWordIntoOutlineObjects = (
		word: string,
		lettersAndGroupings: OutlineObject[],
		wordOutlines: OutlineObject[] = []
	): OutlineObject[] => {
		const multiLetterGroupingMatch = lettersAndGroupings.find((outline) =>
			outline.letterGroupings.some((grouping) => word.startsWith(grouping) && grouping.length > 1)
		);
		let match = word.charAt(0);
		lettersAndGroupings.forEach((outline) =>
			outline.letterGroupings.map((grouping) => {
				if (word.startsWith(grouping) && grouping.length > match.length) match = grouping;
			})
		);
		const outlineObject = multiLetterGroupingMatch
			? multiLetterGroupingMatch
			: lettersAndGroupings.find((outline) => outline.letterGroupings.includes(match));
		const updatedWordOutlines = wordOutlines.concat(outlineObject);
		const updatedWord = word.slice(match.length);
		if (updatedWord.length === 0) return updatedWordOutlines;
		else return turnWordIntoOutlineObjects(updatedWord, lettersAndGroupings, updatedWordOutlines);
	};

	const lettersObjectArray = turnWordIntoOutlineObjects(cleanedWord, outlines);

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
