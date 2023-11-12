export function match(param) {
	const projects = import.meta.glob('$lib/projects/en/*.md');
	return Object.keys(projects)
		.map((path) => path?.split('/').pop()?.slice(0, -3) ?? '')
		.includes(param);
}
