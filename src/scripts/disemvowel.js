export function disemvowelWord(word) {

    function isVowel(letter) {
        return ['a', 'e', 'i', 'o', 'u'].indexOf(letter.toLowerCase()) !== -1;
    }

    const firstLetter = word.charAt(0);
    const finalLetter = word.charAt(word.length - 1);
    const wordNoVowelsOrDoubles = word
        .replace('bb', 'b')
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
        .replace('ck', 'c')
        .replace(/[aeiou]/gi, '')
        ;

    if (word.length === 1) return word;
    else if (
        isVowel(firstLetter) &&
        (finalLetter === 'o' || finalLetter === 'a' || finalLetter === 'i')
    )
        return firstLetter + wordNoVowelsOrDoubles + finalLetter;
    else if (
        !isVowel(firstLetter) &&
        (finalLetter === 'o' || finalLetter === 'a' || finalLetter === 'i')
    )
        return wordNoVowelsOrDoubles + finalLetter;
    else if (isVowel(firstLetter)) return firstLetter + wordNoVowelsOrDoubles;
    else return wordNoVowelsOrDoubles;
}

export function disemvowelBodyOfText(text) {
    const stringArray = text.split(' ');
    const disemvoweledStringArray = stringArray.map((word) => disemvowelWord(word));
    const disemvoweledText = disemvoweledStringArray.join(' ');
    return disemvoweledText;
}

const testSentence =
    'All men live enveloped in whale-lines. All are born with halters round their necks; but it is only when caught in the swift, sudden turn of death, that mortals realize the silent, subtle, everpresent perils of life.';

console.log(testSentence);
console.log(disemvowelBodyOfText(testSentence));
