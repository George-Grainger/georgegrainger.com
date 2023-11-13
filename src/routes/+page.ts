export async function load({ fetch, parent, depends }) {
	depends('home:data');
	const { locale } = await parent();
	const results = await Promise.all([
		fetch('/api/recently-played'),
		fetch('/api/top-tracks'),
		fetch(`/api/projects/${locale}/homepage`)
	]);
	const [currentTrack, topTracks, projects] = await Promise.all(results.map((r) => r.json()));

	return { projects, currentTrack, topTracks };
}
