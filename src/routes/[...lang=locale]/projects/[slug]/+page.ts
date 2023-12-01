import { defaultLocaleVariant } from '$lib/translations/index.js';

export async function load({ params, parent }) {
	const { slug } = params;
	const { lang } = await parent();

	// Can't use $lib here for some reason?
	const project = await import(`../../../../lib/projects/${lang}/${slug}.md`);

	const { title, date, description, inProgress } = project.metadata;
	const content = project.default;

	return {
		content,
		title,
		date: new Date(date).toLocaleString(defaultLocaleVariant[lang], { dateStyle: 'medium' }),
		description,
		inProgress
	};
}
