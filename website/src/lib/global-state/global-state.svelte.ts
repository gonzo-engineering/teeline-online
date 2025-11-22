export const fontFamilies = [ 'Handwriting','No Tears', 'Indie Flower'];
export const themes = ['light', 'dark'];

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

	if (user.theme === 'dark') {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
}
