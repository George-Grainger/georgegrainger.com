export async function load({ fetch, parent }) {
	const { lang } = await parent();
	const response = await fetch(`/api/projects/${lang}`);
	const projects = await response.json();

	return {
		projects
	};
}
