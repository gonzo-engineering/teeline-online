import { expect, test } from 'vitest';
import { alphabet } from './letter-hierarchy';

test('testing for full alphabet', () => {
	const ordered = alphabet.sort().join('');
	const expected = 'abcdefghijklmnopqrstuvwxyz';
	expect(ordered).toBe(expected);
});
