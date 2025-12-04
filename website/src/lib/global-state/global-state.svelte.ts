export const fontFamilies = ['Handwriting', 'No Tears', 'Indie Flower'];
export const themes = ['light', 'dark'];

export const user: { wpm: number; fontFamily: string; theme: 'light' | 'dark' } = $state({
	wpm: 60,
	fontFamily: 'Handwriting',
	theme: 'light'
});

export function setFontFamily(option: string) {
	user.fontFamily = option;
	document.documentElement.style.setProperty('--font-family', option + ', cursive');
}

export function toggleTheme() {
	const currentIndex = themes.indexOf(user.theme);
	const nextIndex = (currentIndex + 1) % themes.length;
	user.theme = themes[nextIndex] as 'light' | 'dark';

	document.documentElement.className = user.theme;
}
