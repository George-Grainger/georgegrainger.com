export async function load({ data, fetch }) {
	const { lang, ...rest } = data;
	const res = await fetch(`/api/projects/${lang}/homepage`);
	const projects = await res.json();

	return { projects, ...rest };
}
