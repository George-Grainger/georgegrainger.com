export async function load({ data, fetch, depends }) {
	depends('home:projects');
	const { lang, ...rest } = data;
	const res = await fetch(`/api/projects/${lang}/homepage`);
	const projects = await res.json();

	return { projects, ...rest };
}
