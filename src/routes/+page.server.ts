export async function load({ fetch }) {
	const results = await Promise.all([fetch('/api/recently-played'), fetch('/api/top-tracks')]);
	const [currentTrack, topTracks] = await Promise.all(results.map((r) => r.json()));

	return { currentTrack, topTracks };
}
