import { dominantConsonants, passiveConsonants } from '../data/letter-hierarchy';
import { findOrCreateOutlineObject } from './build-outline-objects';
import allOutlines from '../data/outlines.json';
import type { OutlineObject } from '../data/interfaces/interfaces';

export const createStartingObject = (text: string, lettersObjectArray: OutlineObject[]) => {
	// Identify dominant letter
	const findDominantLetter = (word: string | undefined) => {
		const dominantConsonant = word.split('').find((letter) => dominantConsonants.includes(letter));
		if (dominantConsonant) {
			return {
				letter: dominantConsonant,
				index: word.indexOf(dominantConsonant)
			};
		}
		const passiveConsonant = word.split('').find((letter) => passiveConsonants.includes(letter));
		if (passiveConsonant) {
			return {
				letter: passiveConsonant,
				index: word.indexOf(passiveConsonant)
			};
		}
		return undefined;
	};
	const dominantLetter = findDominantLetter(text);

	const calculateStartingPoint = (dominantLetter: { letter: string; index: number }) => {
		const dominantLetterStart = findOrCreateOutlineObject(dominantLetter.letter ?? '', allOutlines)
			.lines[0].start;
		const precedingLetters = lettersObjectArray.slice(0, dominantLetter.index).reverse();
		const precedingLetterLines = precedingLetters
			.map((letterObject) => letterObject.lines)
			.reverse();
		// Work backwards from the dominant letter to find the overall starting point
		const startingPoint = precedingLetterLines.reduce(
			({ x, y }, lines) => {
				const [first, ...rest] = lines;
				const last = rest.at(-1) ?? first;
				const start = first.start;
				const end = last.end;
				return {
					x: x + (start.x - end.x),
					y: y + (start.y - end.y)
				};
			},
			{
				x: dominantLetterStart.x,
				y: dominantLetterStart.y
			}
		);
		return startingPoint;
	};

	const { x = 0, y = 0 } = !dominantLetter
		? lettersObjectArray[0].lines[0].start
		: calculateStartingPoint(dominantLetter);

	return {
		combinedLineDetails: [],
		x,
		y
	};
};
