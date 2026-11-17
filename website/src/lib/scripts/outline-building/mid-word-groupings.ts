// Multi-letter groupings that may be used when building a word up from its
// parts, i.e. genuine blends. Any other multi-letter grouping (e.g. 'td' for
// "to do", 'is', 'hv' for "have", or outlines generated from special-outlines
// like 'ts' for "tuesday") is treated as a whole-word abbreviation: it only
// applies when it matches the entire word, which findOrCreateOutlineObject
// checks before building from parts.
//
// Single letters are always allowed.
const MID_WORD_GROUPINGS = new Set([
	// R blends
	'tr',
	'thr',
	'dr',
	'fr',
	'cr',
	'wr',
	// L blends
	'fl',
	// Other
	'ph',
    'cm',
    'mb',
    'mn',
    'sd',
    'ws',
    'chf'
]);

export const canMatchMidWord = (grouping: string) =>
	grouping.length === 1 || MID_WORD_GROUPINGS.has(grouping);