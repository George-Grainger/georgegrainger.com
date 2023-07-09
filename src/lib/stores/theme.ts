import { browser } from '$app/environment';
import { togglable } from './persisted-stores';

export enum THEMES {
	DARK = 'dark',
	LIGHT = 'light'
}

function getSystemTheme() {
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
}

function getInitialTheme() {
	if (!browser) return THEMES.LIGHT;
	return localStorage.getItem('theme') ?? getSystemTheme();
}

export const theme = togglable('theme', getInitialTheme(), THEMES.DARK, THEMES.LIGHT);

theme.subscribe((value) => {
	if (!browser) return;
	document.documentElement.classList.remove(...Object.values(THEMES));
	document.documentElement.classList.add(value);
});
