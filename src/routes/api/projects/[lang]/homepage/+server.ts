import { getProjects, type Project } from '$lib/utils/server/projects';
import { json } from '@sveltejs/kit';

interface ProjectWH extends Project {
	homepage: number;
}

export const GET = async ({ params, setHeaders }) => {
	const { lang } = params;
	const projects = await getProjects(lang);

	// Filter projects not on homepage
	const filterdProjects = projects.filter((p) => p?.homepage) as ProjectWH[];
	const sortedProjects = filterdProjects.sort((a, b) => a.homepage - b.homepage);

	setHeaders({ 'cache-control': 'public, max-age=216000', 'X-Robots-Tag': 'noindex, nofollow' });
	return json(sortedProjects);
};
