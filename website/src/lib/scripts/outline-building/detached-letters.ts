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

// Word endings written as a single detached letter instead of in full.
// The ending is matched on the raw word (before disemvowelling) and replaced
// by `letter`, drawn using the rule stored under `-<ending>` below.
const DETACHED_ENDINGS: Record<string, string> = {
	ing: 'i',
	nce: 'c',
	nse: 'c'
};

const DETACHED_LETTER_RULES: Record<string, DetachmentRule> = {
	t: { offset: { x: 0, y: -30 } },
	d: { offset: { x: 0, y: 30 } },
	tr: { offset: { x: 0, y: -30 } },
	dr: { offset: { x: 0, y: 30 } },
	'-ing': { offset: { x: 20, y: -30 }, always: true, anchor: 'rightmost' },
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

// Returns the ending to abbreviate, if the word has one. Requires something
// before the ending, so the ending on its own is left alone.
export const findDetachedEnding = (word: string) => {
	const ending = Object.keys(DETACHED_ENDINGS).find(
		(ending) => word.endsWith(ending) && word.length > ending.length
	);
	if (!ending) return undefined;
	return {
		stem: word.slice(0, -ending.length),
		letter: DETACHED_ENDINGS[ending],
		// Marker grouping, distinct from any real grouping, used to look up the rule
		grouping: `-${ending}`
	};
};