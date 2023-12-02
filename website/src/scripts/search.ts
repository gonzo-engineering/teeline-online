import type { OutlineObject } from '../data/interfaces/interfaces';
import { disemvowelWord } from './disemvowel';

export const filterAndSortOutlines = (outlines: OutlineObject[], searchTerm: string) => {
	const filteredOutlines = outlines.filter((outline) =>
		outlineMatchesSearchTerm(outline, searchTerm)
	);
	return sortOutlinesByClosenessToSearchTerm(filteredOutlines, searchTerm);
};

const outlineMatchesSearchTerm = (outline: OutlineObject, searchTerm: string) => {
	return (
		outline.specialOutlineMeanings.join('').includes(searchTerm) ||
		outline.letterGroupings.join('').includes(disemvowelWord(searchTerm))
	);
};

const sortOutlinesByClosenessToSearchTerm = (outlines: OutlineObject[], searchTerm: string) => {
	const giveOutlineMatchScore = (outline: OutlineObject, searchTerm: string) => {
		const hasExactSpecialMatch = outline.specialOutlineMeanings.some(
			(specialOutline) => specialOutline === searchTerm
		);
		const hasExactLetterGroupingMatch = outline.letterGroupings.some(
			(letterGrouping) => letterGrouping === disemvowelWord(searchTerm)
		);
		if (hasExactSpecialMatch && hasExactLetterGroupingMatch) return 3;
		else if (hasExactSpecialMatch || hasExactLetterGroupingMatch) return 2;
		else return 1;
	};
	return outlines.sort((outlineA, outlineB) => {
		const outlineAScore = giveOutlineMatchScore(outlineA, searchTerm);
		const outlineBScore = giveOutlineMatchScore(outlineB, searchTerm);
		return outlineAScore > outlineBScore ? -1 : outlineAScore < outlineBScore ? 1 : 0;
	});
};
