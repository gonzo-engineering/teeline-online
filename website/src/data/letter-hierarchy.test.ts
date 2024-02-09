import { expect, test } from 'vitest';
import { alphabet } from './letter-hierarchy';

test('testing for full alphabet', () =>
	expect(alphabet.join('')).toBe('abcdefghijklmnopqrstuvwxyz'));
