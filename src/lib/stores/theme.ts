import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const themes = {
	DARK: 'dark',
	LIGHT: 'light'
};

const getDefaultTheme = () => {
	if (!browser) {
		return themes.LIGHT;
	}
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? themes.DARK : themes.LIGHT;
};

const getInitialTheme = () => {
	if (!browser) {
		return getDefaultTheme();
	}
	return window.localStorage.getItem('theme') ?? getDefaultTheme();
};

function createThemeStore() {
	const { subscribe, set } = writable<string>(getInitialTheme());

	const applyTheme = (theme: string) => {
		if (!browser) return;
		window.localStorage.setItem('theme', theme);
		document.documentElement.classList.remove(themes.LIGHT, themes.DARK);
		document.documentElement.classList.add(theme);
	};

	return {
		subscribe: (run: (value: string) => void) =>
			subscribe((value) => {
				applyTheme(value);
				run(value);
			}),
		toggle: () => set(getInitialTheme() === themes.DARK ? themes.LIGHT : themes.DARK)
	};
}

export const theme = createThemeStore();
