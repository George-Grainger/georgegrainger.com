import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';
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
	store.subscribe((val) => browser && document.documentElement.setAttribute('data-motion', val));
	return {
		...store,
		...options
	};
}

export const motion = createMotion();
