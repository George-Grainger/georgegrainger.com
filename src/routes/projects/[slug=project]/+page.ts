export async function load({ params, parent }) {
	const { locale } = await parent();

	// Can't use $lib here for some reason?
	const project = await import(`../../../lib/projects/${locale}/${params.slug}.md`);

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
