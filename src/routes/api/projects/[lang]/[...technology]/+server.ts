import { getProjects } from '$lib/utils/server/projects';
import { json } from '@sveltejs/kit';

export const GET = async ({ params, setHeaders }) => {
	const { technology, lang } = params;
	let projects = await getProjects(lang);

	if (technology) {
		projects = projects.filter((p) => p?.technologies?.includes(technology));
	}

	setHeaders({ 'cache-control': 'public, max-age=216000' });
	return json(projects);
};
