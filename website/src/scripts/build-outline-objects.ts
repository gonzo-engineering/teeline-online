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
	const lettersObjectArray: OutlineObject[] = lettersArray.map((letter) =>
		allOutlines.find((outline) => outline.letterGroupings.includes(letter))
	);
	// Approach A: Combine outline line paths into one
	let combinedOutlinePath = '';
	let combinedLength = 0;
	// TODO: Track x and y coordinates
	for (let i = 0; i < lettersObjectArray.length; i++) {
		for (let j = 0; j < lettersObjectArray[i].lines.length; j++) {
			if (i === 0 && j === 0) {
				combinedOutlinePath += lettersObjectArray[i].lines[j].path;
			} else {
				combinedOutlinePath += lettersObjectArray[i].lines[j].path.replace(
					/M[\d\.]+( |,)[\d\.]+/,
					''
				);
			}
			combinedLength += lettersObjectArray[i].lines[j].length;
		}
	}
	// Approach B: Combine outline line paths into array of line details
	let combinedLineDetails: LineDetails[] = [];
	let xTracker = lettersObjectArray[0].lines[0].end.x;
	let yTracker = lettersObjectArray[0].lines[0].end.y;
	for (let i = 0; i < lettersObjectArray.length; i++) {
		for (let j = 0; j < lettersObjectArray[i].lines.length; j++) {
			if (i === 0 && j === 0) {
				combinedLineDetails = combinedLineDetails.concat(lettersObjectArray[i].lines[j]);
			} else {
				const newPath =
					`M${xTracker},${yTracker}` +
					lettersObjectArray[i].lines[j].path.replace(/M[\d\.]+( |,)[\d\.]+/, '');
				const diffX = Math.abs(lettersObjectArray[i].lines[j].end.x - xTracker);
				const diffY = Math.abs(lettersObjectArray[i].lines[j].end.y - yTracker);
				const newEnd = {
					x: xTracker + diffX,
					y: yTracker + diffY
				};
				combinedLineDetails = combinedLineDetails.concat({
					path: newPath,
					length: lettersObjectArray[i].lines[j].length,
					start: { x: xTracker, y: yTracker },
					end: newEnd
				});
				xTracker += diffX;
				yTracker += diffY;
			}
		}
	}
	// Return new outline object
	return {
		letterGroupings: [cleanedWord],
		specialOutlineMeanings: [],
		lines:
			config.singleOrMultiple === 'single'
				? [
						{
							path: combinedOutlinePath,
							length: combinedLength,
							start: { x: 0, y: 0 },
							end: { x: 0, y: 0 }
						}
				  ]
				: combinedLineDetails
	};
};
