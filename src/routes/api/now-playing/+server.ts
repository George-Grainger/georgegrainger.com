import { filterTrackData, getSpotifyResponse } from '$lib/utils/server/spotify.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ setHeaders }) {
	const nowPlayingEndpoint = `https://api.spotify.com/v1/me/player/currently-playing`;
	const res = await getSpotifyResponse(nowPlayingEndpoint);

	if (!res.ok) {
		throw error(res.status, res.statusText);
	}

	if (res.status == 204) {
		throw error(430, 'Not currently playing a song');
	}

	const data = await res.json();
	const track = filterTrackData(data.item);
	const duration = data.item.duration_ms;
	const progressMs = data.progress_ms;

	setHeaders({ 'cache-control': 'public, max-age=30' });
	return json({ ...track, duration, progressMs });
}
