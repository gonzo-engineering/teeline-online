import type { OutlineObject } from '../data/outlines/outlines';

export function prettify(outlineNames: string[]): string {
	return outlineNames.toString().replace(/,/g, ' / ');
}

export function sortAlphabetically(outlinesArray: OutlineObject[]): OutlineObject[] {
	outlinesArray.sort(function (a, b) {
		var textA = a.name[0].toUpperCase();
		var textB = b.name[0].toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
	return outlinesArray;
}

export function shuffle(outlinesArray: OutlineObject[]): OutlineObject[] {
	for (let i = outlinesArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[outlinesArray[i], outlinesArray[j]] = [outlinesArray[j], outlinesArray[i]];
	}
	return outlinesArray;
}

export function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
