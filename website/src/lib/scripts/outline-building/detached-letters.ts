// Letters that are told apart purely by position, so in some contexts must be
// lifted off the preceding letter rather than joined to it.
// SVG y grows downwards, so a negative y is "above".
type DetachmentRule = {
	offset: { x: number; y: number };
	// Detach whatever precedes it, rather than only after DETACH_AFTER groupings
	always?: boolean;
	// 'end' (default): offset from where the preceding letter finished.
	// 'rightmost': x is the gap between the word's rightmost point so far and
	// this letter's leftmost point, so it never overlaps; y is still from the end.
	anchor?: 'end' | 'rightmost';
};

const DETACH_AFTER = ['t', 'd', 'tr', 'thr', 'dr', 'r', 'fr'];

// Letter sequences written as a single detached letter instead of in full.
// They're matched on the raw word (before disemvowelling), anywhere except
// the very start, and drawn using the rule stored under `-<blend>` below.
const DETACHED_BLENDS: Record<string, string> = {
	ang: 'a',
	ange: 'a',
	ing: 'i',
	inge: 'i',
	ong: 'o',
	onge: 'o',
	ung: 'e',
	unge: 'e',
	nce: 'c',
	nse: 'c'
};

const DETACHED_LETTER_RULES: Record<string, DetachmentRule> = {
	t: { offset: { x: 0, y: -30 } },
	d: { offset: { x: 0, y: 30 } },
	tr: { offset: { x: 0, y: -30 } },
	dr: { offset: { x: 0, y: 30 } },
	'-ang': { offset: { x: 20, y: -30 }, always: true, anchor: 'rightmost' },
	'-ange': { offset: { x: 20, y: -30 }, always: true, anchor: 'rightmost' },
	'-ing': { offset: { x: 20, y: -30 }, always: true, anchor: 'rightmost' },
	'-inge': { offset: { x: 20, y: -30 }, always: true, anchor: 'rightmost' },
	'-ong': { offset: { x: 20, y: -30 }, always: true, anchor: 'rightmost' },
	'-onge': { offset: { x: 20, y: -30 }, always: true, anchor: 'rightmost' },
	'-ung': { offset: { x: 20, y: -30 }, always: true, anchor: 'rightmost' },
	'-unge': { offset: { x: 20, y: -30 }, always: true, anchor: 'rightmost' },
	'-nce': { offset: { x: 20, y: -30 }, always: true, anchor: 'rightmost' },
	'-nse': { offset: { x: 20, y: -30 }, always: true, anchor: 'rightmost' }
};

export const getDetachmentOffset = (grouping: string, precedingGrouping?: string) => {
	if (!precedingGrouping) return undefined;
	const rule = DETACHED_LETTER_RULES[grouping];
	if (!rule) return undefined;
	return rule.always || DETACH_AFTER.includes(precedingGrouping)
		? { ...rule.offset, anchor: rule.anchor ?? 'end' }
		: undefined;
};

export type WordPart =
	| { kind: 'letters'; text: string }
	// `grouping` is a marker like '-ing', distinct from any real grouping,
	// used to look up the detachment rule and label the outline
	| { kind: 'blend'; letter: string; grouping: string };

const blendsLongestFirst = Object.keys(DETACHED_BLENDS).sort((a, b) => b.length - a.length);

// Splits a raw (not yet disemvowelled) word into runs of ordinary letters and
// detached blends, scanning left to right. A blend can't start the word, so
// 'ingot' is left alone, but can appear anywhere after that:
// 'ringing' → r, -ing, -ing; 'longer' → l, -ong, er
export const splitOnDetachedBlends = (word: string): WordPart[] => {
	const parts: WordPart[] = [];
	let letters = '';

	for (let i = 0; i < word.length; ) {
		const blend = i > 0 ? blendsLongestFirst.find((b) => word.startsWith(b, i)) : undefined;
		if (blend) {
			if (letters) parts.push({ kind: 'letters', text: letters });
			letters = '';
			parts.push({ kind: 'blend', letter: DETACHED_BLENDS[blend], grouping: `-${blend}` });
			i += blend.length;
		} else {
			letters += word[i++];
		}
	}
	if (letters) parts.push({ kind: 'letters', text: letters });

	return parts;
};