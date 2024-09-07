import specials from '../data/special-outlines.json';
import type { LineDetails, OutlineObject, SpecialOutline } from '../data/interfaces/interfaces';
import { disemvowelWord } from './disemvowel';
import { createStartingObject } from './calculate-starting-point';

const checkedSpecials: SpecialOutline[] = specials;
const punctuationRegex = /[,\/#!$%\^&\*;:{}=\-_`~()]/g;

export const findOrCreateOutlineObject = (
	word: string,
	outlines: OutlineObject[]
): OutlineObject => {
	const lowerCaseWord = word.toLowerCase();
	// Check if custom special outline exists for word
	const specialOutline = outlines.find((outline) =>
		outline.specialOutlineMeanings.includes(lowerCaseWord)
	);
	if (specialOutline) return specialOutline;

	// Check if letter grouping exists for word
	const letterGrouping = outlines.find((outline) =>
		outline.letterGroupings.includes(disemvowelWord(lowerCaseWord))
	);
	if (letterGrouping) return letterGrouping;

	// Remove special characters from word
	const cleanedWord = disemvowelWord(lowerCaseWord).replace(punctuationRegex, '');
	if (cleanedWord.length === 0) {
		return {
			letterGroupings: [],
			specialOutlineMeanings: [],
			lines: []
		};
	}

	// Find matching letter or letter grouping at start of word until no more letters
	function mapWordToOutlines(
		word: string,
		lettersAndGroupings: OutlineObject[],
		wordOutlines: OutlineObject[] = []
	): OutlineObject[] {
		if (!word) return wordOutlines; // Base case for recursion

		const lowerCaseWord = word.toLowerCase();
		// Find the longest matching letter grouping at the start of the word
		let longestMatch = '';
		let matchedOutline: OutlineObject | undefined;

		for (const outline of lettersAndGroupings) {
			for (const grouping of outline.letterGroupings) {
				if (lowerCaseWord.startsWith(grouping) && grouping.length > longestMatch.length) {
					longestMatch = grouping;
					matchedOutline = outline;
				}
			}
		}

		// If no match was found, return the accumulated word outlines
		if (!matchedOutline) return wordOutlines;

		// Otherwise, append the found outline and continue recursively
		return mapWordToOutlines(lowerCaseWord.slice(longestMatch.length), lettersAndGroupings, [
			...wordOutlines,
			matchedOutline
		]);
	}

	const lettersObjectArray = mapWordToOutlines(cleanedWord, outlines);

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

export function convertPassageToOutlines(
	passage: string,
	lettersAndGroupings: OutlineObject[],
	result: OutlineObject[] = []
): OutlineObject[] {
	const cleanedPassage = passage.replace(punctuationRegex, '');

	let longestMatch = '';
	let longestMatchIncludesPeriod = false;
	let matchedOutline: OutlineObject | undefined;

	if (cleanedPassage.startsWith('.')) {
		longestMatch = '.';
		matchedOutline = findOrCreateOutlineObject(longestMatch, lettersAndGroupings);
	}

	// Find the longest special meaning match
	for (const outline of lettersAndGroupings) {
		for (const meaning of outline.specialOutlineMeanings) {
			if (
				cleanedPassage.startsWith(meaning) &&
				meaning.split(' ').length > longestMatch.split(' ').length &&
				// Check we're not splicing matches e.g. matching
				// 'and the' special meaning with 'and there'
				(cleanedPassage.charAt(meaning.length) === ' ' || cleanedPassage === meaning)
			) {
				longestMatch = meaning;
				matchedOutline = outline;
			}
		}
	}

	if (!matchedOutline) {
		// Default to the first word if no special meaning found
		longestMatch = cleanedPassage.split(' ')[0];
		longestMatchIncludesPeriod = longestMatch.endsWith('.');
		matchedOutline = findOrCreateOutlineObject(
			longestMatchIncludesPeriod ? longestMatch.slice(0, -1) : longestMatch,
			lettersAndGroupings
		);
	}

	const updatedResult = [...result, matchedOutline];
	const updatedPassage = longestMatchIncludesPeriod
		? '.' + cleanedPassage.slice(longestMatch.length)
		: cleanedPassage.slice(longestMatch.length).trim();

	return updatedPassage === ''
		? updatedResult
		: convertPassageToOutlines(updatedPassage, lettersAndGroupings, updatedResult);
}
