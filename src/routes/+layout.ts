import { addTranslations, setLocale, setRoute } from '$lib/translations';
import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
// import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

// // Vercel analytics stuff
// injectSpeedInsights();
inject({ mode: dev ? 'development' : 'production' });

export const load = async ({ data }) => {
	const { i18n, translations } = data;
	const { lang, route } = i18n;

	addTranslations(translations);

	await setRoute(route);
	await setLocale(lang);

	return i18n;
};
