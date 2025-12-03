export const fontFamilies = ['Handwriting', 'No Tears', 'Indie Flower'];
export const themes = ['light', 'dark', 'banana'];

export const user: { wpm: number; fontFamily: string; theme: 'light' | 'dark' | 'banana' } = $state(
	{
		wpm: 60,
		fontFamily: 'Handwriting',
		theme: 'light'
	}
);

export function setFontFamily(option: string) {
	user.fontFamily = option;
	document.documentElement.style.setProperty('--font-family', option + ', Indie Flower, cursive');
}

export function toggleTheme() {
	const currentIndex = themes.indexOf(user.theme);
	const nextIndex = (currentIndex + 1) % themes.length;
	user.theme = themes[nextIndex] as 'light' | 'dark' | 'banana';

	document.documentElement.className = user.theme;
}
