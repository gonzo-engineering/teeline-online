import lettersAndGroupings from '$lib/data/outlines.json';
import specials from '$lib/data/special-outlines.json';
import type { OutlineObject, SpecialOutline } from '$lib/data/interfaces/interfaces';
import { findOrCreateOutlineObject } from './outline-building/build-outline-objects';
import { sortOutlinesAlphabetically } from './helpers';

const hydrateOutlineData = (lettersAndGroupings: OutlineObject[], specials: SpecialOutline[]) => {
	const combinedOutlines = lettersAndGroupings.map((outline) => {
		const specialOutline = specials.find((specialOutline) =>
			outline.letterGroupings.includes(specialOutline.letterGrouping)
		);
		if (specialOutline) {
			return {
				...outline,
				specialOutlineMeanings: specialOutline.meanings
			};
		}
		return outline;
	});
	const specialOutlinesWithoutLetterGrouping = specials.filter(
		(specialOutline) =>
			!lettersAndGroupings.some((outline) =>
				outline.letterGroupings.includes(specialOutline.letterGrouping)
			)
	);
	const specialOutlineObjects = specialOutlinesWithoutLetterGrouping.map((specialOutline) => {
		return findOrCreateOutlineObject(specialOutline.letterGrouping, combinedOutlines);
	});
	return [...combinedOutlines, ...specialOutlineObjects];
};

export const hydratedData = sortOutlinesAlphabetically(
	hydrateOutlineData(lettersAndGroupings, specials)
);
