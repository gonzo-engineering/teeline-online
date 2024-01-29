export const disemvowelWord = (word: string) => {
	const isVowel = (letter: string) => {
		return ['a', 'e', 'i', 'o', 'u'].includes(letter.toLowerCase());
	};
	const firstLetter = word.charAt(0);
	const finalLetter = word.charAt(word.length - 1);
	const finalLetterIsSoundedVowel = ['a', 'i', 'o', 'u'].includes(finalLetter.toLowerCase());
	const endsWithUe = word.slice(-2) === 'ue';
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
		.replace('ck', 'c')
		.replace(/[aeiou]/gi, '');
	if (word.length === 1) return word;
	else if (isVowel(firstLetter) && finalLetterIsSoundedVowel)
		return firstLetter + wordNoVowelsOrDoubles + finalLetter;
	else if (!isVowel(firstLetter) && finalLetterIsSoundedVowel)
		return wordNoVowelsOrDoubles + finalLetter;
	else if (isVowel(firstLetter) && endsWithUe) return firstLetter + wordNoVowelsOrDoubles + 'u';
	else if (!isVowel(firstLetter) && endsWithUe) return wordNoVowelsOrDoubles + 'u';
	else if (isVowel(firstLetter)) return firstLetter + wordNoVowelsOrDoubles;
	else return wordNoVowelsOrDoubles;
};

export const disemvowelBodyOfText = (text: string) => {
	const disemvoweledStringArray = text.split(' ').map((word) => disemvowelWord(word));
	const disemvoweledText = disemvoweledStringArray.join(' ');
	return disemvoweledText;
};

// const testSentence =
// 'All men live enveloped in whale-lines. All are born with halters round their necks; but it is only when caught in the swift, sudden turn of death, that mortals realize the silent, subtle, everpresent perils of life.';

// console.log(testSentence);
// console.log(disemvowelBodyOfText(testSentence));
