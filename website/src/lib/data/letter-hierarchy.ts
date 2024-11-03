export const vowels = ['a', 'e', 'i', 'o', 'u'];

export const dominantConsonants = ['b', 'd', 'h', 'j', 'l', 'p', 'r', 't'];

export const passiveConsonants = ['c', 'f', 'g', 'k', 'm', 'n', 'q', 's', 'v', 'w', 'x', 'y', 'z'];

export const alphabet = [...vowels, ...dominantConsonants, ...passiveConsonants].sort();
