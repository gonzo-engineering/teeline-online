import type { OutlineObject } from '../data/interfaces/interfaces';

export const prettify = (outlineNames: string[]): string => {
	return outlineNames.toString().replace(/,/g, ' / ');
};

export const sortOutlinesAlphabetically = (outlinesArray: OutlineObject[]): OutlineObject[] => {
	outlinesArray.sort((a, b) => {
		const outlineLabelA = a.letterGroupings
			? a.letterGroupings[0].toUpperCase()
			: a.specialOutlineMeanings[0].toUpperCase();
		const outlineLabelB = b.letterGroupings
			? b.letterGroupings[0].toUpperCase()
			: b.specialOutlineMeanings[0].toUpperCase();
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

export const findMatchingSpecialOutline = (
	outlineName: string,
	outlineArray: OutlineObject[]
): OutlineObject => {
	const foundOutline = outlineArray.find(
		(outline) =>
			outline.specialOutlineMeanings && outline.specialOutlineMeanings.includes(outlineName)
	);

	// if (foundOutline === undefined)
	// 	console.log(`Special outline for '${outlineName}' could not be found.`);

	return foundOutline;
};

export const findMatchingOutline = (word: string, outlinesArray: OutlineObject[]) => {
	const disemvoweledWord = disemvowelWord(word);
	const matchingLetterSequenceOutline = outlinesArray
		.filter((outline) => outline.letterGroupings)
		.find((outline) => outline.letterGroupings.includes(disemvoweledWord));
	const matchingSpecialOutline = findMatchingSpecialOutline(
		word,
		outlinesArray.filter((outline) => outline.specialOutlineMeanings)
	);

	if (matchingSpecialOutline) return matchingSpecialOutline;
	else if (matchingLetterSequenceOutline) return matchingLetterSequenceOutline;
	else return null;
};

export const disemvowelWord = (word: string) => {
	const isVowel = (letter: string) => {
		return ['a', 'e', 'i', 'o', 'u'].indexOf(letter.toLowerCase()) !== -1;
	};

	const firstLetter = word.charAt(0);
	const finalLetter = word.charAt(word.length - 1);
	const wordNoVowelsOrDoubles = word
		.replace('bb', 'b')
		.replace('dd', 'd')
		.replace('ff', 'f')
		.replace('gg', 'g')
		.replace('ll', 'l')
		.replace('mm', 'm')
		.replace('nn', 'n')
		.replace('pp', 'p')
		.replace('rr', 'r')
		.replace('ss', 's')
		.replace('tt', 't')
		.replace('vv', 'v')
		.replace('ck', 'c')
		.replace(/[aeiou]/gi, '');
	if (word.length === 1) return word;
	else if (
		isVowel(firstLetter) &&
		(finalLetter === 'o' || finalLetter === 'a' || finalLetter === 'i')
	)
		return firstLetter + wordNoVowelsOrDoubles + finalLetter;
	else if (
		!isVowel(firstLetter) &&
		(finalLetter === 'o' || finalLetter === 'a' || finalLetter === 'i')
	)
		return wordNoVowelsOrDoubles + finalLetter;
	else if (isVowel(firstLetter)) return firstLetter + wordNoVowelsOrDoubles;
	else return wordNoVowelsOrDoubles;
};

export const disemvowelBodyOfText = (text: string) => {
	const stringArray = text.split(' ');
	const disemvoweledStringArray = stringArray.map((word) => disemvowelWord(word));
	const disemvoweledText = disemvoweledStringArray.join(' ');
	return disemvoweledText;
};

const testSentence =
	'All men live enveloped in whale-lines. All are born with halters round their necks; but it is only when caught in the swift, sudden turn of death, that mortals realize the silent, subtle, everpresent perils of life.';

// console.log(testSentence);
// console.log(disemvowelBodyOfText(testSentence));
