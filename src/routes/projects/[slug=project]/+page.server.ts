import { defaultLocale } from '$lib/translations/index.js';

export async function load({ cookies }) {
	const lang = cookies.get('lang') ?? defaultLocale;

	return { lang };
}
