import type { OutlineObject } from '../data/interfaces/interfaces';

export const prettify = (outlineNames: string[]): string => {
	return outlineNames.toString().replace(/,/g, ' / ');
};

export const sortOutlinesAlphabetically = (outlinesArray: OutlineObject[]): OutlineObject[] => {
	outlinesArray.sort((outlineA, outlineB) => {
		const outlineLabelA =
			outlineA.letterGroupings.length > 0
				? outlineA.letterGroupings[0].toUpperCase()
				: outlineA.specialOutlineMeanings[0].toUpperCase();
		const outlineLabelB =
			outlineB.letterGroupings.length > 0
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
