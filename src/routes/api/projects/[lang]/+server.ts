import { getProjects } from '$lib/utils/server/projects';
import { json } from '@sveltejs/kit';

export const GET = async ({ url, params, setHeaders }) => {
	const { lang } = params;
	const offset = Number(url.searchParams.get('offset')) ?? 0;
	const limit = Number(url.searchParams.get('limit')) ?? -1;
	const tag = url.searchParams.get('tag') ?? '';
	let projects = await getProjects(lang, offset, limit, tag);

	setHeaders({ 'X-Robots-Tag': 'noindex, nofollow' });
	return json(projects);
};
