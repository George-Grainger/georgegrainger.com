export async function load({ fetch, parent }) {
	const { locale } = await parent();
	const response = await fetch(`/api/projects/${locale}`);
	const projects = await response.json();

	return {
		projects
	};
}
