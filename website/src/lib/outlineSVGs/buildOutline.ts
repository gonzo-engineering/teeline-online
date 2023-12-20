import allOutlines from '../../data/outlines.json';
import type { LineDetails, OutlineObject } from '../../data/interfaces/interfaces';

export const createOutlineObject = (word: string): OutlineObject => {
	// Break word into array of letters
	const lettersArray = word.split('');
	// Find outline object of each letter
	const lettersObjectArray: OutlineObject[] = lettersArray.map((letter) =>
		allOutlines.find((outline) => outline.letterGroupings.includes(letter))
	);
	// Approach A: Combine outline line paths into one
	let combinedOutlinePath = '';
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
		letterGroupings: [word],
		specialOutlineMeanings: [],
		lines: combinedLineDetails
	};
};
