import { defaultLocale } from '$lib/translations/index.js';

export async function load({ fetch, cookies }) {
	const lang = cookies.get('lang') ?? defaultLocale;
	const response = await fetch(`/api/projects/${lang}`);
	const projects = await response.json();

	return {
		projects
	};
}
