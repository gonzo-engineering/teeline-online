import specials from '#lib/data/special-outlines.json';
import type {
	LineDetails,
	OutlineObject,
	SpecialOutline
} from '#lib/data/interfaces/interfaces.ts';
import { disemvowelWord } from '../disemvowel';
import { createStartingObject } from './calculate-starting-point';
import { findDetachedEnding, getDetachmentOffset } from './detached-letters';
import { buildMultiDigitNumberObject } from './numbers/build-multi-digit-number';
import { getLinesXBounds } from './path-bounds';
import { downUpI } from './special-endings';

const checkedSpecials: SpecialOutline[] = specials;
const punctuationRegex = /[,\/#!$%\^&\*;:{}=\-_`~()]/g;

type GroupingMatch = { grouping: string; outline: OutlineObject };

// Matches the opening move command of a path, tolerating whitespace, commas,
// negatives, lowercase 'm' and scientific notation
const NUM = String.raw`-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?`;
const LEADING_MOVE = new RegExp(String.raw`^\s*[Mm]\s*(${NUM})[\s,]*(${NUM})`, 'i');

const movePathStart = (path: string, x: number, y: number) => {
	if (!LEADING_MOVE.test(path)) {
		if (import.meta.env.DEV) console.warn('Could not reposition path:', path.slice(0, 40));
		return path;
	}
	return path.replace(LEADING_MOVE, `M${x} ${y}`);
};

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

	// If word parses as a number, get each digit's outline
	if (!isNaN(parseInt(lowerCaseWord)) && lowerCaseWord.length > 1) {
		return buildMultiDigitNumberObject(lowerCaseWord, outlines);
	}

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
	// Tracks which grouping matched as well as the outline, since an outline
	// object can hold several groupings and we need to know if it was a 't' or 'd'
	function mapWordToOutlines(
		word: string,
		lettersAndGroupings: OutlineObject[],
		matches: GroupingMatch[] = []
	): GroupingMatch[] {
		if (!word) return matches;

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
		if (!matchedOutline) return matches;

		// Otherwise, append the found outline and continue recursively
		return mapWordToOutlines(lowerCaseWord.slice(longestMatch.length), lettersAndGroupings, [
			...matches,
			{ grouping: longestMatch, outline: matchedOutline }
		]);
	}

	// Endings like '-nce' are written as a detached letter rather than in full,
	// so the rest of the word is built as normal and that letter appended after
	const ending = findDetachedEnding(lowerCaseWord.replace(punctuationRegex, ''));
	// The stem's last vowel isn't really word-final (the ending follows it), so
	// strip any trailing vowels disemvowelWord kept, but never the first letter
	const endingStem = ending
		? disemvowelWord(ending.stem)
				.replace(punctuationRegex, '')
				.replace(/(?<=.)[aeiou]+$/, '')
		: '';
	const endingOutline = ending
		? outlines.find((outline) => outline.letterGroupings.includes(ending.letter))
		: undefined;
	const endingMatch: GroupingMatch | undefined =
		ending && endingStem && endingOutline
			? { grouping: ending.grouping, outline: endingOutline }
			: undefined;
	const wordToMap = endingMatch ? endingStem : cleanedWord;

	const matches = mapWordToOutlines(wordToMap, outlines);
	if (matches.length === 0) {
		return { letterGroupings: [], specialOutlineMeanings: [], lines: [] };
	}
	const lettersObjectArray = matches.map(({ outline }) => outline);
	const matchedGroupings = matches.map(({ grouping }) => grouping);

	// If last letter is 'y' replace the last letterObjectLines entry with the appropriate 'i' object
	if (wordToMap.slice(-1) === 'y') {
		// Penultimate letter
		const penultimateLetter = wordToMap.charAt(wordToMap.length - 2);
		const regularIObject = findOrCreateOutlineObject('i', outlines);
		const downUpIObject = downUpI;
		const lettersThatShouldBeFollowedByDownUpI = ['f', 'g', 'h', 'j', 'n', 'p', 'z'];
		if (lettersThatShouldBeFollowedByDownUpI.includes(penultimateLetter)) {
			lettersObjectArray[lettersObjectArray.length - 1] = downUpIObject;
		} else {
			lettersObjectArray[lettersObjectArray.length - 1] = regularIObject;
		}
	}

	if (endingMatch) {
		lettersObjectArray.push(endingMatch.outline);
		matchedGroupings.push(endingMatch.grouping);
	}

	// Calculated after the 'y' swap so it measures the outlines actually drawn
	const startingObject = createStartingObject(matchedGroupings, lettersObjectArray);

	const letterObjectLines = lettersObjectArray.map((letterObject) => letterObject?.lines);

	const { combinedLineDetails } = letterObjectLines.reduce<{
		combinedLineDetails: LineDetails[];
		x: number;
		y: number;
	}>(({ combinedLineDetails, x, y }, lines, index) => {
		const [first, ...rest] = lines;
		const last = rest.at(-1) ?? first;

		// The first letter has no predecessor, and its position is already
		// handled by createStartingObject
		const detachment = getDetachmentOffset(matchedGroupings[index], matchedGroupings[index - 1]);
		let startX = x + (detachment?.x ?? 0);
		const startY = y + (detachment?.y ?? 0);

		// Place this letter's leftmost point clear of everything drawn so far,
		// rather than relative to where the last stroke happened to finish
		if (detachment?.anchor === 'rightmost' && combinedLineDetails.length > 0) {
			const wordRight = getLinesXBounds(combinedLineDetails).max;
			const letterLeft = getLinesXBounds([...lines]).min;
			startX = wordRight + detachment.x + (first.start.x - letterLeft);
		}

		const offsetLines = lines.map((line) => {
			const start = {
				x: startX + line.start.x - first.start.x,
				y: startY + line.start.y - first.start.y
			};
			const end = {
				x: start.x + line.end.x - line.start.x,
				y: start.y + line.end.y - line.start.y
			};
			// Keep start/end in step with the moved path, so a generated outline
			// can itself be reused as a building block (e.g. 'ts' inside 'tst')
			return { ...line, path: movePathStart(line.path, start.x, start.y), start, end };
		});

		combinedLineDetails.push(...offsetLines);

		// The next letter carries on from wherever this one finished
		return {
			combinedLineDetails,
			x: startX + last.end.x - first.start.x,
			y: startY + last.end.y - first.start.y
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
