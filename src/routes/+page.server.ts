export const config = {
	isr: { expiration: 60 }
};

export async function load({ fetch, cookies, depends }) {
	depends('home:data');

	const lang = cookies.get('lang') ?? 'en';
	const results = await Promise.all([
		fetch('/api/recently-played'),
		fetch('/api/top-tracks'),
		fetch(`/api/projects/${lang}/homepage`)
	]);
	const [currentTrack, topTracks, projects] = await Promise.all(results.map((r) => r.json()));

	return { currentTrack, topTracks, projects };
}
