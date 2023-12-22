import allOutlines from '../data/outlines.json';
import type { LineDetails, OutlineObject } from '../data/interfaces/interfaces';
import { disemvowelWord } from './disemvowel';

interface Config {
	singleOrMultiple: 'single' | 'multiple';
}

export const createOutlineObjects = (text: string, config: Config): OutlineObject[] => {
	// TODO: Account for punctuation
	// TODO: Account for multi-word special outlines
	const wordsInText = text.toLowerCase().split(' ');
	const outlineObjects = wordsInText.map((word) => createOutlineObject(word, config));
	return outlineObjects;
};

const createOutlineObject = (word: string, config: Config): OutlineObject => {
	// Check if special outline exists for word
	const specialOutline = allOutlines.find((outline) =>
		outline.specialOutlineMeanings.includes(word)
	);
	if (specialOutline) {
		return specialOutline;
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
		.map((letter) => allOutlines.find((outline) => outline.letterGroupings.includes(letter)))
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
				console.log({ then: line.path, now: path });
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

	// Return new outline object
	return {
		letterGroupings: [cleanedWord],
		specialOutlineMeanings: [],
		lines: combinedLineDetails
	};
};
