export async function load({ fetch, parent }) {
	const { lang } = await parent();
	const response = await fetch(`/api/projects/${lang}/all`);
	const projects = await response.json();

	return {
		projects
	};
}
