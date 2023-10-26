import { filterTrackData, getSpotifyResponse } from '$lib/utils/server/spotify.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ setHeaders }) {
	const recentlyPlayedEndpoint = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
	const res = await getSpotifyResponse(recentlyPlayedEndpoint);

	if (!res.ok) {
		throw error(res.status, res.statusText);
	}

	const { items } = await res.json();
	const track = filterTrackData(items[0].track);
	const playedAt = items[0].played_at;

	setHeaders({ 'cache-control': 'public, max-age=180' });
	return json({ ...track, playedAt });
}
