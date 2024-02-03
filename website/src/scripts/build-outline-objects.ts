import { allOutlines, findOrCreateOutlineObject } from '../data/combined-outlines';
import type { OutlineObject } from '../data/interfaces/interfaces';
const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;

export const createOutlineObjects = (text: string): OutlineObject[] => {
	// Remove punctuation
	text = text.replace(punctuationRegex, '');
	// TODO: Account for multi-word special outlines
	const wordsInText = text.toLowerCase().split(' ');
	const outlineObjects = wordsInText.map((word) => findOrCreateOutlineObject(word, allOutlines));
	return outlineObjects;
};
