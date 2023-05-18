import type { OutlineObject } from '../data/interfaces/interfaces';
import { disemvowelWord } from './disemvowel';

export const prettify = (outlineNames: string[]): string => {
	return outlineNames.toString().replace(/,/g, ' / ');
};

export const sortOutlinesAlphabetically = (outlinesArray: OutlineObject[]): OutlineObject[] => {
	outlinesArray.sort((outlineA, outlineB) => {
		const outlineLabelA = outlineA.letterGroupings
			? outlineA.letterGroupings[0].toUpperCase()
			: outlineA.specialOutlineMeanings[0].toUpperCase();
		const outlineLabelB = outlineB.letterGroupings
			? outlineB.letterGroupings[0].toUpperCase()
			: outlineB.specialOutlineMeanings[0].toUpperCase();
		return outlineLabelA < outlineLabelB ? -1 : outlineLabelA > outlineLabelB ? 1 : 0;
	});
	return outlinesArray;
};

export const shuffleOutlines = (outlinesArray: OutlineObject[]): OutlineObject[] => {
	for (let i = outlinesArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[outlinesArray[i], outlinesArray[j]] = [outlinesArray[j], outlinesArray[i]];
	}
	return outlinesArray;
};

export const randomIntFromInterval = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const findMatchingOutline = (word: string, outlinesArray: OutlineObject[]) => {
	const disemvoweledWord = disemvowelWord(word);
	const matchingLetterSequenceOutline = outlinesArray.find(
		(outline) => outline.letterGroupings && outline.letterGroupings.includes(disemvoweledWord)
	);
	const matchingSpecialOutline = outlinesArray.find(
		(outline) => outline.specialOutlineMeanings && outline.specialOutlineMeanings.includes(word)
	);

	if (matchingSpecialOutline) return matchingSpecialOutline;
	else if (matchingLetterSequenceOutline) return matchingLetterSequenceOutline;
	else return null;
};

export const outlineMatchesSearchTerm = (outline: OutlineObject, searchTerm: string) => {
	return (
		(outline.specialOutlineMeanings &&
			outline.specialOutlineMeanings.join('').includes(searchTerm)) ||
		(outline.letterGroupings && outline.letterGroupings.join('').includes(searchTerm)) ||
		(outline.letterGroupings && outline.letterGroupings.includes(disemvowelWord(searchTerm)))
	);
};
