import { getProjects } from '$lib/utils/server/projects';
import { json } from '@sveltejs/kit';

export const GET = async ({ params, setHeaders }) => {
	const { lang } = params;
	const projects = await getProjects(lang);
	const sortedProjects = projects
		.filter((p) => p?.homepage)
		.sort((a, b) => a.homepage!! - b.homepage!!);

	setHeaders({ 'cache-control': 'public, max-age=216000', 'X-Robots-Tag': 'noindex, nofollow' });
	return json(sortedProjects);
};
