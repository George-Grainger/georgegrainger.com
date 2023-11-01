import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';
import { persisted } from './persisted-stores';

const options = {
	ON: 'on',
	OFF: 'off'
};

type AutoplayOption = keyof typeof options;
type Autoplay = Writable<string> & { [key in AutoplayOption]: string };

function createAutoplay(): Autoplay {
	const getInitialAutoplay = () => {
		if (!browser) return options.ON;
		return localStorage.getItem('autoplay') ?? options.ON;
	};

	const store = persisted('autoplay', getInitialAutoplay(), options);
	return {
		...store,
		...options
	};
}

export const autoplay = createAutoplay();
