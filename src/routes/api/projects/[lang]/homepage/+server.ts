import { getProjects } from '$lib/utils/server/projects';
import { json } from '@sveltejs/kit';

export const GET = async ({ params, setHeaders }) => {
	const { lang } = params;
	const projects = await getProjects(lang);

	setHeaders({ 'cache-control': 'public, max-age=216000' });
	return json(projects.filter((p) => p?.homepage));
};
