import i18n, { type Config } from 'sveltekit-i18n';
import { browser, dev } from '$app/environment';

interface Params {
	title?: string;
	date?: string;
	time?: string;
	// add more parameters that are used here
}

export const defaultLocaleVariant: Record<string, string> = {
	en: 'en-GB',
	fr: 'fr-FR'
};

export const defaultLocale = 'en';
export const config: Config<Params> = {
	preprocess: 'preserveArrays',
	loaders: [
		{
			locale: 'en',
			key: 'global',
			loader: async () => (await import('./en/global.json')).default
		},
		{
			locale: 'en',
			key: 'home',
			routes: ['', '/'],
			loader: async () => (await import('./en/home.json')).default
		},
		{
			locale: 'en',
			key: 'projects',
			routes: [/\/projects\/?.*/],
			loader: async () => (await import('./en/projects.json')).default
		},
		{
			locale: 'en',
			key: 'contact',
			routes: ['/contact'],
			loader: async () => (await import('./en/contact.json')).default
		},
		{
			locale: 'en',
			key: 'preferences',
			routes: ['/preferences'],
			loader: async () => (await import('./en/preferences.json')).default
		},
		{
			locale: 'en',
			key: 'terms-of-use',
			routes: ['/terms-of-use'],
			loader: async () => (await import('./en/terms-of-use.json')).default
		},
		{
			locale: 'en',
			key: 'privacy-policy',
			routes: ['/privacy-policy'],
			loader: async () => (await import('./en/privacy-policy.json')).default
		},
		{
			locale: 'en',
			key: 'error',
			// routes: ['error'],
			loader: async () => (await import('./en/error.json')).default
		},
		{
			locale: 'fr',
			key: 'global',
			loader: async () => (await import('./fr/global.json')).default
		},
		{
			locale: 'fr',
			key: 'home',
			routes: ['', '/'],
			loader: async () => (await import('./fr/home.json')).default
		},
		{
			locale: 'fr',
			key: 'projects',
			routes: [/\/projects\/?.*/],
			loader: async () => (await import('./fr/projects.json')).default
		},
		{
			locale: 'fr',
			key: 'contact',
			routes: ['/contact'],
			loader: async () => (await import('./fr/contact.json')).default
		},
		{
			locale: 'fr',
			key: 'preferences',
			routes: ['/preferences'],
			loader: async () => (await import('./fr/preferences.json')).default
		},
		{
			locale: 'fr',
			key: 'terms-of-use',
			routes: ['/terms-of-use'],
			loader: async () => (await import('./fr/terms-of-use.json')).default
		},
		{
			locale: 'fr',
			key: 'privacy-policy',
			routes: ['/privacy-policy'],
			loader: async () => (await import('./fr/privacy-policy.json')).default
		},
		{
			locale: 'fr',
			key: 'error',
			// routes: ['error'],
			loader: async () => (await import('./fr/error.json')).default
		}
	]
};

export const {
	t,
	loading,
	locales,
	locale,
	translations,
	loadTranslations,
	addTranslations,
	setLocale,
	setRoute
} = new i18n(config);

const oneYear = 1000 * 60 * 60 * 24 * 365;
locale.subscribe(($locale) => {
	if (!browser || !$locale) return;
	document.cookie = `lang=${$locale} ; expires=${oneYear} ; path = /; SameSite=strict ;`;
	document.documentElement.setAttribute('lang', $locale);
});

dev && loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
