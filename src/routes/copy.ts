import getAccessToken from '$lib/utils/server/get-access-token.js';

export const load = async ({ fetch }) => {
	const { access_token } = await getAccessToken();
	const endpoints = {
		now_playing: 'https://api.spotify.com/v1/me/player/currently-playing',
		recently_played: 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=9',
		top_tracks: 'https://api.spotify.com/v1/me/top/tracks'
	};

	const get_spotify_data = async (endpoint: string) => {
		return fetch(endpoint, {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		});
	};

	const data = await Promise.all(Object.values(endpoints).map(get_spotify_data));
	// const data = await Promise.all(Object.values(endpoints).map(get_spotify_data));
	console.log(data.map((val) => val.json()));

	return { test: 'hello' };
};
