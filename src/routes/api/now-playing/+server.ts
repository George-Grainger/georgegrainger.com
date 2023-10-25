import getAccessToken from '$lib/utils/server/get-access-token.js';
import { json } from '@sveltejs/kit';

export async function GET({ fetch }) {
	const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

	const { access_token } = await getAccessToken();
	const res = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	if (!res.ok) {
		json({ error: true, status: res.status, message: 'Failed to get recently playing.' });
	}

	const data = await res.json();
	return json(data);
}
