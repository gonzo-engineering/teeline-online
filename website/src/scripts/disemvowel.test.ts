import { expect, test } from 'vitest';
import { disemvowelWord, disemvowelBodyOfText } from './disemvowel';

test('testing word disemvowelment', () => {
	expect(disemvowelWord('bellow')).toBe('blw');
	expect(disemvowelWord('hello')).toBe('hlo');
	expect(disemvowelWord('amusement')).toBe('amsmnt');
});

test('testing passage disemvowelment', () => {
	expect(
		disemvowelBodyOfText(
			'All men live enveloped in whale-lines. All are born with halters round their necks; but it is only when caught in the swift, sudden turn of death, that mortals realize the silent, subtle, everpresent perils of life.'
		)
	).toBe(
		'Al mn lv envlpd in wl-lns. Al ar brn wth hltrs rnd thr ncs; bt it is only wn ct in th swft, sdn trn of dth, tht mrtls rlz th slnt, sbtl, evrprsnt prls of lf.'
	);
});
