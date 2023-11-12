export async function load({ data, params }) {
	// Can't use $lib here for some reason?
	const project = await import(`../../../lib/projects/${data.lang}/${params.slug}.md`);

	const { title, date, description, inProgress } = project.metadata;
	const content = project.default;

	return {
		content,
		title,
		date: new Date(date).toLocaleString(date.lang, { dateStyle: 'medium' }),
		description,
		inProgress
	};
}
