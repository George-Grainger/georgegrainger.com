import { browser } from '$app/environment';
import type { Updater, Writable } from 'svelte/store';
import { persisted } from './persisted-stores';

const options = {
	DARK: 'dark',
	LIGHT: 'light'
};

type ThemeOption = keyof typeof options;
type Theme = Writable<string> & { toggle: () => void } & { [key in ThemeOption]: string };

function createTheme(): Theme {
	const getSystemTheme = () => {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? options.DARK : options.LIGHT;
	};

	const getInitialTheme = () => {
		if (!browser) return options.LIGHT;
		return localStorage.getItem('theme') ?? getSystemTheme();
	};

	const store = persisted('theme', getInitialTheme());
	const update = (callback: Updater<string>) => {
		store.update((last) => {
			const value = callback(last);
			document.documentElement.classList.replace(last, value);
			return value;
		});
	};

	const toggle = () => update((last) => (last === options.DARK ? options.LIGHT : options.DARK));
	return {
		...store,
		update,
		toggle,
		...options
	};
}

export const theme = createTheme();
