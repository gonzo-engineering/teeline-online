export const fontFamilies = ['Handwriting', 'No Tears', 'Indie Flower'];
export const themes = ['light', 'gold', 'dark'];

export const user: { wpm: number; fontFamily: string; theme: string } = $state({
	wpm: 60,
	fontFamily: 'Handwriting',
	theme: 'light'
});

export function setFontFamily(option: string) {
	user.fontFamily = option;
	document.documentElement.style.setProperty('--font-family', option + ', Indie Flower, cursive');
}

export function toggleTheme() {
	user.theme = themes[(themes.indexOf(user.theme) + 1) % themes.length];
	document.documentElement.className = user.theme;
}
