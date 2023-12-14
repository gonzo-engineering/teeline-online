import allOutlines from '../../data/outlines.json';
import type { LineDetails, OutlineObject } from '../../data/interfaces/interfaces';

export const createOutlineObject = (word: string): OutlineObject => {
    // Break word into array of letters
    const lettersArray = word.split('');
    // Find outline object of each letter
    const lettersObjectArray: OutlineObject[] = lettersArray.map((letter) =>
        allOutlines.find((outline) => outline.letterGroupings.includes(letter))
    );
    // Combine outline line paths into one
    let combinedOutlinePath = '';
    for (let i = 0; i < lettersObjectArray.length; i++) {
        for (let j = 0; j < lettersObjectArray[i].lines.length; j++) {
            combinedOutlinePath += lettersObjectArray[i].lines[j].path;
        }
    }
    let combinedLineDetails: LineDetails[] = [];
    for (let i = 0; i < lettersObjectArray.length; i++) {
        combinedLineDetails = combinedLineDetails.concat(lettersObjectArray[i].lines);
    }
    // Return new outline object
    return {
        letterGroupings: [word],
        specialOutlineMeanings: [],
        lines: combinedLineDetails,
    };
};
