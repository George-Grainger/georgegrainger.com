export async function load({ fetch, cookies, depends }) {
	depends('projects:data');
	const lang = cookies.get('lang') ?? 'en';
	const response = await fetch(`/api/projects/${lang}`);
	const projects = await response.json();

	return {
		projects
	};
}
