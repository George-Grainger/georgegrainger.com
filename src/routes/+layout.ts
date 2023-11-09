import { loadTranslations } from '$lib/utils/client/i18n';

export async function load({ url, data }) {
	return await loadTranslations(data.languages, url.pathname);
}
