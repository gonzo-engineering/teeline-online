export const user = $state({
	wpm: 60
});

export const setWPM = (newWPM: number) => {
	user.wpm = newWPM;
};
