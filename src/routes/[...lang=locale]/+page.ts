export async function load({ fetch, depends, parent }) {
	const { lang } = await parent();
	const results = await Promise.all([
		fetch('/api/recently-played'),
		fetch('/api/top-tracks'),
		fetch(`/api/projects/${lang}/homepage`)
	]);
	depends('home:data');
	const [currentTrack, topTracks, projects] = await Promise.all(results.map((r) => r.json()));
	return { projects, currentTrack, topTracks };
}
