export const fontFamilies = ['Handwriting', 'No Tears', 'Indie Flower'];

export const user: { wpm: number; fontFamily: string; theme: 'light' | 'dark' } = $state({
	wpm: 60,
	fontFamily: 'Handwriting',
	theme: 'light'
});

export function setFontFamily(option: string) {
	user.fontFamily = option;
	document.documentElement.style.setProperty('--font-family', option + ', Indie Flower, cursive');
}

export function toggleTheme() {
	user.theme = user.theme === 'light' ? 'dark' : 'light';
	document.documentElement.className = user.theme;
}
