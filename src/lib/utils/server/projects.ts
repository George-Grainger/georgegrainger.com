interface Metadata {
	title: string;
	subtitle: string;
	description: string;
	src: string;
	placeholderSrc?: string;
	alt: string;
	tags: string[];
	date: string;
	homepage?: number;
	github: string;
	inProgress: boolean;
}

export interface Project extends Metadata {
	slug: string;
}

export const getProjects = async (lang = 'en', offset = 0, limit = 10, tag = '') => {
	let allProjects;
	if (lang === 'fr') {
		allProjects = import.meta.glob('$lib/projects/fr/*.md');
	} else {
		allProjects = import.meta.glob('$lib/projects/en/*.md');
	}

	let projects = await Promise.all(
		Object.entries(allProjects).map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as { metadata: Metadata };
			metadata.inProgress = metadata.inProgress ?? false;
			const slug = '/projects/' + path?.split('/').pop()?.slice(0, -3);
			return { ...metadata, slug };
		})
	);
	projects = projects.filter((p) => 'date' in p);

	if (tag) {
		projects = projects.filter((p) => p?.tags?.includes(tag));
	}

	let sortedProjects = projects.sort((a, b) => +new Date(b.date) - +new Date(a.date));

	if (offset) {
		sortedProjects = sortedProjects.slice(offset);
	}

	if (limit && limit != -1 && limit < sortedProjects.length) {
		sortedProjects = sortedProjects.slice(0, limit);
	}

	return sortedProjects.map((p) => {
		return { ...p };
	});
};
