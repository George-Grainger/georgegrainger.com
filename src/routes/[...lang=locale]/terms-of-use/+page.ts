export async function load({ parent }) {
	const { lang } = await parent();

	// Can't use $lib here for some reason?
	const page = await import(`../../../lib/translations/${lang}/terms-of-use.md`);

	const { title } = page.metadata;
	const content = page.default;

	return {
		content,
		title
	};
}
