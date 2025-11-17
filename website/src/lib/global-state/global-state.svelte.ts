export const fontFamilies = ['No Tears', 'Handwriting', 'Indie Flower'];
export const themes = ['light', 'dark'];

export const user: { wpm: number; fontFamily: string; theme: 'light' | 'dark' } = $state({
	wpm: 60,
	fontFamily: 'Indie Flower',
	theme: 'light'
});

export function setFontFamily(option: (typeof fontFamilies)[number]) {
	user.fontFamily = option;
	document.documentElement.style.setProperty('--font-family', option);
}

export function toggleTheme() {
	user.theme = user.theme === 'light' ? 'dark' : 'light';

	if (user.theme === 'dark') {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
}
