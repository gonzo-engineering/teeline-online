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
	function mapWordToOutlines(
		word: string,
		outlines: OutlineObject[],
		wordOutlines: OutlineObject[] = []
	): OutlineObject[] {
		if (!word) return wordOutlines; // Base case for recursion

		// Find the longest matching letter grouping at the start of the word
		let longestMatch = '';
		let matchedOutline: OutlineObject | undefined;

		for (const outline of outlines) {
			for (const grouping of outline.letterGroupings) {
				if (word.startsWith(grouping) && grouping.length > longestMatch.length) {
					longestMatch = grouping;
					matchedOutline = outline;
				}
			}
		}

		// If no match was found, return the accumulated word outlines
		if (!matchedOutline) return wordOutlines;

		// Otherwise, append the found outline and continue recursively
		return mapWordToOutlines(word.slice(longestMatch.length), outlines, [
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
	outlines: OutlineObject[],
	result: OutlineObject[] = []
): OutlineObject[] {
	const cleanedPassage = passage.replace(punctuationRegex, '');
	let longestMatch = '';
	let matchedOutline: OutlineObject | undefined;

	// Find the longest special meaning match
	for (const outline of outlines) {
		for (const meaning of outline.specialOutlineMeanings) {
			if (
				cleanedPassage.startsWith(meaning) &&
				meaning.split(' ').length > longestMatch.split(' ').length
				// TODO: Check that the match is for complete words. 'And there are' should
				// not be matching with the special outline 'and the'
			) {
				longestMatch = meaning;
				matchedOutline = outline;
			}
		}
	}

	if (!matchedOutline) {
		// Default to the first word if no special meaning found
		longestMatch = cleanedPassage.split(' ')[0];
		matchedOutline = findOrCreateOutlineObject(longestMatch, outlines);
	}

	const updatedResult = [...result, matchedOutline];
	const updatedPassage = cleanedPassage.slice(longestMatch.length).trim();

	return updatedPassage === ''
		? updatedResult
		: convertPassageToOutlines(updatedPassage, outlines, updatedResult);
}
