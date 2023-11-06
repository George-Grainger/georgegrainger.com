import { filterTrackData, getSpotifyResponse } from '$lib/utils/server/spotify';
import { error, json } from '@sveltejs/kit';

export async function GET({ setHeaders }) {
	const topTracksEndpoint = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=9`;
	const res = await getSpotifyResponse(topTracksEndpoint).catch((e) => e);

	if (res.status == 503) {
		const tracks = await import('$lib/api-backup/top-tracks');
		return json(tracks.default);
	}

	if (!res.ok) {
		throw error(res.status, res.statusText);
	}

	const { items } = await res.json();
	const tracks = items.map(filterTrackData);

	setHeaders({ 'cache-control': 'public, max-age=3600' });
	return json(tracks);
}
