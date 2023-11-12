import { filterTrackData, getSpotifyResponse } from '$lib/utils/server/spotify';
import { json } from '@sveltejs/kit';

export async function GET({ setHeaders }) {
	const topTracksEndpoint = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=9`;
	const res = await getSpotifyResponse(topTracksEndpoint).catch((e) => e);

	// Handle Spotify Down
	if (!res.ok) {
		const tracks = (await import('$lib/api-backup/top-tracks')).default;
		return json(tracks);
	}

	const { items } = await res.json();
	const tracks = items.map(filterTrackData);

	setHeaders({ 'cache-control': 'public, max-age=3600', 'X-Robots-Tag': 'noindex, nofollow' });
	return json(tracks);
}
