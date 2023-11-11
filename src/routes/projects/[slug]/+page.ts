export async function load({ data, params }) {
	// Can't use $lib here for some reason?
	const post = await import(`../../../lib/projects/${data.lang}/${params.slug}.md`);
	const { title, date, src } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		date,
		src
	};
}
