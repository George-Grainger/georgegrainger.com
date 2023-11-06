import i18n from 'sveltekit-i18n';
import lang from './lang.json';
import type { Config } from '@sveltejs/kit';

const config: Config = {
	translations: {
		en: { lang },
		fr: { lang }
	},
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
			key: 'error',
			routes: ['error'],
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
			key: 'error',
			routes: ['error'],
			loader: async () => (await import('./fr/error.json')).default
		}
	]
};

export const defaultLocale = 'en';

export const {
	t,
	locale,
	locales,
	loading,
	addTranslations,
	loadTranslations,
	translations,
	setRoute,
	setLocale
} = new i18n(config);

// Translations logs
loading.subscribe(async ($loading) => {
	if ($loading) {
		console.log('Loading translations...');

		await loading.toPromise();
		console.log('Updated translations', translations.get());
	}
});
