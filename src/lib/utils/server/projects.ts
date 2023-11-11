interface Metadata {
	title: string;
	subtitle: string;
	description: string;
	src: string;
	placeholderSrc?: string;
	alt: string;
	technologies: string[];
	date: string;
	homepage?: boolean;
}

export interface Project extends Metadata {
	slug: string;
}

export const getProjects = async (lang = 'en') => {
	let allProjects;
	if (lang === 'fr') {
		allProjects = import.meta.glob('$lib/projects/fr/*.md');
	} else {
		allProjects = import.meta.glob('$lib/projects/en/*.md');
	}

	const projects = await Promise.all(
		Object.entries(allProjects).map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as { metadata: Metadata };
			const slug = '/projects/' + path?.split('/').pop()?.slice(0, -3) ?? null;
			return { ...metadata, slug };
		})
	);

	const sortedProjects = projects.sort((a, b) => +new Date(b.date) - +new Date(a.date));

	return sortedProjects.map((p) => {
		return { ...p };
	});
};
