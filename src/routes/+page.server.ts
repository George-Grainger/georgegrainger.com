import { defaultLocale } from '$lib/translations/index.js';

export async function load({ fetch, cookies, depends }) {
	depends('home:spotify');

	const results = await Promise.all([fetch('/api/recently-played'), fetch('/api/top-tracks')]);
	const [currentTrack, topTracks] = await Promise.all(results.map((r) => r.json()));
	const lang = cookies.get('lang') ?? defaultLocale;

	return { currentTrack, topTracks, lang };
}
