import { convertPassageToOutlines } from './outline-building/build-outline-objects';
import { disemvowelBodyOfText } from './disemvowel';
import { hydratedData } from './hydrate-outline-data';

const hundredWords = [
	'about',
	'all',
	'also',
	'and',
	'as',
	'at',
	'be',
	'because',
	'but',
	'by',
	'can',
	'come',
	'could',
	'day',
	'do',
	'even',
	'find',
	'first',
	'for',
	'from',
	'get',
	'give',
	'go',
	'have',
	'he',
	'her',
	'here',
	'him',
	'his',
	'how',
	'I',
	'if',
	'in',
	'into',
	'it',
	'its',
	'just',
	'know',
	'like',
	'look',
	'make',
	'man',
	'many',
	'me',
	'more',
	'my',
	'new',
	'no',
	'not',
	'now',
	'of',
	'on',
	'one',
	'only',
	'or',
	'other',
	'our',
	'out',
	'people',
	'say',
	'see',
	'she',
	'so',
	'some',
	'take',
	'tell',
	'than',
	'that',
	'the',
	'their',
	'them',
	'then',
	'there',
	'these',
	'they',
	'thing',
	'think',
	'this',
	'those',
	'time',
	'to',
	'two',
	'up',
	'use',
	'very',
	'want',
	'way',
	'we',
	'well',
	'what',
	'when',
	'which',
	'who',
	'will',
	'with',
	'would',
	'year',
	'you',
	'your'
];

const disemvoweledText = disemvowelBodyOfText(hundredWords.join(' '));

const outlines = convertPassageToOutlines(disemvoweledText, hydratedData);

const totalLength = outlines.reduce(
	(acc, outline) => acc + outline.lines.reduce((acc, line) => acc + line.length, 0),
	0
);

export const wpms: {
	speed: number;
	divider: number;
}[] = [
	{ speed: 40, divider: 90 },
	{ speed: 60, divider: 60 },
	{ speed: 80, divider: 45 },
	{ speed: 100, divider: 36 },
	{ speed: 120, divider: 30 },
	{ speed: 140, divider: 25 }
];

export const speeds = wpms.reduce((acc, { speed, divider }) => {
	const animationSpeed = totalLength / divider;
	return { ...acc, [speed]: animationSpeed };
}, {});
