import { defaultLocaleVariant } from '$lib/translations/index.js';
import type { Project } from '$lib/utils/server/projects.js';

export async function load({ fetch, parent }) {
	const { lang } = await parent();
	const response = await fetch(`/api/projects/${lang}/all`);
	const projects = await response.json();

	projects.map((p: Project) => {
		p.date = new Date(p.date).toLocaleString(defaultLocaleVariant[lang], { dateStyle: 'medium' });
		return p;
	});

	return {
		projects
	};
}
