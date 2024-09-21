import { writable } from 'svelte/store';

export const user = writable({
	wpm: 60
});
