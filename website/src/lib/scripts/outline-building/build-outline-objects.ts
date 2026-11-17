import specials from '#lib/data/special-outlines.json';
import type {
	LineDetails,
	OutlineObject,
	SpecialOutline
} from '#lib/data/interfaces/interfaces.ts';
import { disemvowelWord } from '../disemvowel';
import { createStartingObject } from './calculate-starting-point';
import { getDetachmentOffset, splitOnDetachedBlends, type WordPart } from './detached-letters';
import { canMatchMidWord } from './mid-word-groupings';
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
	// object can hold several groupings and we need to know if it was a 't' or 'd'.
	// Only single letters and genuine blends are used here; whole-word
	// abbreviations were already checked against the full word above.
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
				if (
					canMatchMidWord(grouping) &&
					lowerCaseWord.startsWith(grouping) &&
					grouping.length > longestMatch.length
				) {
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

	// Blends like '-ing' and '-nce' are written as a detached letter rather
	// than in full, wherever they fall after the first letter. Split the raw
	// word around them, disemvowel the runs of letters in between, and build
	// each run as normal with the blend letters slotted in.
	const parts = splitOnDetachedBlends(lowerCaseWord.replace(punctuationRegex, ''));
	const blendOutline = (letter: string) =>
		outlines.find((outline) => outline.letterGroupings.includes(letter));
	const useBlends =
		parts.some((part) => part.kind === 'blend') &&
		parts.every((part) => part.kind === 'letters' || blendOutline(part.letter));

	const segments: WordPart[] = useBlends
		? parts.map((part, i) => {
				if (part.kind === 'blend') return part;
				let text = disemvowelWord(part.text).replace(punctuationRegex, '');
				// Vowels next to a blend aren't really at the start or end of the word,
				// so strip any disemvowelWord kept there. The word's first letter stays.
				if (i > 0) text = text.replace(/^[aeiou]+/, '');
				if (i < parts.length - 1) {
					text = i === 0 ? text.replace(/(?<=.)[aeiou]+$/, '') : text.replace(/[aeiou]+$/, '');
				}
				return { kind: 'letters', text };
			})
		: [{ kind: 'letters', text: cleanedWord }];

	const matches = segments.flatMap((segment): GroupingMatch[] =>
		segment.kind === 'blend'
			? [{ grouping: segment.grouping, outline: blendOutline(segment.letter)! }]
			: mapWordToOutlines(segment.text, outlines)
	);
	if (matches.length === 0) {
		return { letterGroupings: [], specialOutlineMeanings: [], lines: [] };
	}
	const lettersObjectArray = matches.map(({ outline }) => outline);
	const matchedGroupings = matches.map(({ grouping }) => grouping);

	// The drawn word as letters, with '-' standing in for each blend, e.g. 'r--'
	const drawnLetters = segments
		.map((segment) => (segment.kind === 'letters' ? segment.text : '-'))
		.join('');

	// If last letter is 'y' replace the last letterObjectLines entry with the appropriate 'i' object
	if (drawnLetters.slice(-1) === 'y') {
		// Penultimate letter
		const penultimateLetter = drawnLetters.charAt(drawnLetters.length - 2);
		const regularIObject = findOrCreateOutlineObject('i', outlines);
		const downUpIObject = downUpI;
		const lettersThatShouldBeFollowedByDownUpI = ['f', 'g', 'h', 'j', 'n', 'p', 'z'];
		if (lettersThatShouldBeFollowedByDownUpI.includes(penultimateLetter)) {
			lettersObjectArray[lettersObjectArray.length - 1] = downUpIObject;
		} else {
			lettersObjectArray[lettersObjectArray.length - 1] = regularIObject;
		}
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

	// Label blends explicitly (e.g. 'longer' → 'l -ong r' rather than 'lngr'),
	// since they aren't drawn letter by letter
	const groupingLabel = useBlends
		? segments
				.map((segment) => (segment.kind === 'letters' ? segment.text : segment.grouping))
				.filter(Boolean)
				.join(' ')
		: cleanedWord;

	// Return new outline object
	return {
		letterGroupings: [groupingLabel],
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
