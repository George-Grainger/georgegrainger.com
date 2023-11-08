import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';
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

	const initialTheme = getInitialTheme();
	const store = persisted('theme', initialTheme, options);
	store.subscribe((value) => {
		if (!browser) return;

		if (!Object.values(options).includes(value)) {
			store.set(initialTheme);
		}

		document.documentElement.setAttribute('data-theme', value);
	});
	const toggle = () => {
		store.update((last) => (last === options.DARK ? options.LIGHT : options.DARK));
	};
	return {
		...store,
		toggle,
		...options
	};
}

export const theme = createTheme();
