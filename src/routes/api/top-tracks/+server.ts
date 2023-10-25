import filterTrackData from '$lib/utils/server/filter-track-data.js';
import getAccessToken from '$lib/utils/server/get-access-token.js';
import { json } from '@sveltejs/kit';

export async function GET({ fetch, setHeaders }) {
	const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=9`;

	const { access_token } = await getAccessToken();
	const res = await fetch(TOP_TRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	if (!res.ok) {
		json({ error: true, status: res.status, message: 'Failed to get top tracks.' });
	}

	const data = await res.json();
	const time = new Date().toLocaleTimeString();

	setHeaders({ 'cache-control': 'public, max-age=3600' });
	return json({ time, data });
}
