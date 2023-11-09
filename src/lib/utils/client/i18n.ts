import type { Config } from 'sveltekit-i18n';
import I18n from 'sveltekit-i18n';

interface Params {
	title?: string;
	date?: string;
	time?: string;
	// add more parameters that are used here
}

const config: Config<Params> = {
	preprocess: 'preserveArrays',
	loaders: [
		{
			locale: 'en',
			key: 'global',
			loader: async () => (await import('$lib/translations/en/global.json')).default
		},
		{
			locale: 'en',
			key: 'home',
			routes: ['', '/'],
			loader: async () => (await import('$lib/translations/en/home')).default
		},
		{
			locale: 'en',
			key: 'error',
			// routes: ['error'],
			loader: async () => (await import('$lib/translations/en/error.json')).default
		},
		{
			locale: 'fr',
			key: 'global',
			loader: async () => (await import('$lib/translations/fr/global.json')).default
		},
		{
			locale: 'fr',
			key: 'home',
			routes: ['', '/'],
			loader: async () => (await import('$lib/translations/fr/home')).default
		},
		{
			locale: 'fr',
			key: 'error',
			// routes: ['error'],
			loader: async () => (await import('$lib/translations/fr/error.json')).default
		}
	]
};

const availableLanguages = new Set(config.loaders?.map((loader) => loader.locale) ?? []);
const defaultLocale = 'en';
const defaultLocaleForLanguage: Record<string, string> = {
	en: 'en',
	fr: 'fr'
};

export async function loadTranslations(languages: readonly string[], route: string) {
	const locale =
		languages.find((lang) =>
			availableLanguages.has(
				!lang.includes('-') && lang in defaultLocaleForLanguage
					? defaultLocaleForLanguage[lang]
					: lang
			)
		) ?? defaultLocale;

	const instance = new I18n(config);
	await instance.loadTranslations(locale, route);

	return { ...instance };
}
