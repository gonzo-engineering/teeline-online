import { expect, test } from 'vitest';
import { inferPrecedingLinesLength } from './line-length-inference';
import { findOrCreateOutlineObject } from './build-outline-objects';
import { hydratedData } from './hydrate-outline-data';

test('testing preceding line length inference', () => {
	expect(inferPrecedingLinesLength(findOrCreateOutlineObject('as a result', hydratedData), 2)).toBe(
		235
	);
	expect(inferPrecedingLinesLength(findOrCreateOutlineObject('that the', hydratedData), 1)).toBe(
		428
	);
});
