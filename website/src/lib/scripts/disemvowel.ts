export const disemvowelWord = (word: string) => {
	if (word.length === 1) return word;

	const firstLetter = word.slice(0, 1);
	const isVowel = (letter: string) => {
		return ['a', 'e', 'i', 'o', 'u'].includes(letter.toLowerCase());
	};
	const start = isVowel(firstLetter) ? firstLetter : '';

	const wordNoVowelsOrDoubles = word
		.replace('bb', 'b')
		.replace('cc', 'c')
		.replace('dd', 'd')
		.replace('ff', 'f')
		.replace('gg', 'g')
		.replace('ll', 'l')
		.replace('mm', 'm')
		.replace('nn', 'n')
		.replace('pp', 'p')
		.replace('rr', 'r')
		.replace('ss', 's')
		.replace('tt', 't')
		.replace('vv', 'v')
		.replace('zz', 'z')
		.replace('wh', 'w')
		.replace('ck', 'c')
		.replace('ght', 't')
		.replace(/[aeiou]/gi, '');

	const inferEnd = (word: string) => {
		const lastLetter = word.slice(-1);
		const lastTwoLetters = word.slice(-2);
		const finalLetterIsSoundedVowel = ['a', 'i', 'o', 'u'].includes(lastLetter.toLowerCase());
		if (finalLetterIsSoundedVowel) return lastLetter;
		else
			switch (lastTwoLetters) {
				case 'ue':
					return 'u';
				case 'ee':
					return 'e';
				case 'ae':
					return 'i';
				case 'ie':
					return 'i';
				case 'oe':
					return 'o';
				default:
					return '';
			}
	};
	const end = inferEnd(word);

	return start + wordNoVowelsOrDoubles + end;
};

export const disemvowelBodyOfText = (text: string) => {
	const disemvoweledStringArray = text.split(' ').map((word) => disemvowelWord(word));
	const disemvoweledText = disemvoweledStringArray.join(' ');
	return disemvoweledText;
};
