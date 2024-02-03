import lettersAndLetterGroupings from './outlines.json';
import specialOutlines from './special-outlines.json';
import type { OutlineObject } from './interfaces/interfaces';
import { findOrCreateOutlineObject } from '../scripts/build-outline-objects';

const specialOutlineObjects = specialOutlines.map((specialOutline) =>
	findOrCreateOutlineObject(specialOutline.letterGrouping, lettersAndLetterGroupings)
);

export const allOutlines: OutlineObject[] = [
	...lettersAndLetterGroupings,
	...specialOutlineObjects
];
