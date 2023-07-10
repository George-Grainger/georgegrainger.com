import { browser } from '$app/environment';
import type { Updater, Writable } from 'svelte/store';
import { persisted } from './persisted-stores';

const options = {
	REDUCE: 'reduce',
	NO_PREFERENCE: 'no-preference'
};

type MotionOption = keyof typeof options;
type Motion = Writable<string> & { [key in MotionOption]: string };

function createMotion(): Motion {
	const getSystemMotion = () => {
		return window.matchMedia('(prefers-reduced-motion: reduced)').matches
			? options.REDUCE
			: options.NO_PREFERENCE;
	};

	const getInitialMotion = () => {
		if (!browser) return options.NO_PREFERENCE;
		return localStorage.getItem('motion') ?? getSystemMotion();
	};

	const store = persisted('motion', getInitialMotion());
	const update = (callback: Updater<string>) => {
		store.update((last) => {
			const value = callback(last);
			document.documentElement.classList.replace(last, value);
			return value;
		});
	};

	return {
		...store,
		update,
		...options
	};
}

export const motion = createMotion();
