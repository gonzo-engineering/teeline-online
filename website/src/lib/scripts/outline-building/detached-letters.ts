// Letters that are told apart purely by position, so in some contexts must be
// lifted off the preceding letter rather than joined to it. `after` lists the
// preceding groupings that trigger the detachment — add to it as needed.
// SVG y grows downwards, so a negative y is "above".
type DetachmentRule = { offset: { x: number; y: number } };

const DETACH_AFTER = ['t', 'd', 'tr', 'dr', 'r', 'fr'];

const DETACHED_LETTER_RULES: Record<string, DetachmentRule> = {
	t: { offset: { x: 0, y: -24 } },
	d: { offset: { x: 0, y: 24 } },
	tr: { offset: { x: 0, y: -24 } },
	dr: { offset: { x: 0, y: 24 } }
};

export const getDetachmentOffset = (grouping: string, precedingGrouping?: string) => {
	if (!precedingGrouping) return undefined;
	const rule = DETACHED_LETTER_RULES[grouping];
	return rule && DETACH_AFTER.includes(precedingGrouping) ? rule.offset : undefined;
};