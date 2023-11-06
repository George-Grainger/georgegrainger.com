import { filterTrackData, getSpotifyResponse } from '$lib/utils/server/spotify.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ setHeaders }) {
	const recentlyPlayedEndpoint = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
	const res = await getSpotifyResponse(recentlyPlayedEndpoint).catch((e) => e);

	if (res.status == 503) {
		const track = (await import('$lib/api-backup/recently-played')).default;
		return json(track);
	}

	if (!res.ok) {
		throw error(res.status, res.statusText);
	}

	const { items } = await res.json();
	const track = filterTrackData(items[0].track);
	const duration = items[0].track.duration_ms / 1000;
	const playedAt = items[0].played_at;

	setHeaders({ 'cache-control': 'public, max-age=180' });
	return json({ ...track, duration, playedAt, isPlaying: false, isOffline: false });
}
