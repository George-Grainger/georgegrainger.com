import type { Track } from 'spotify-types';

import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REFRESH_TOKEN
} from '$env/static/private';
import { error } from '@sveltejs/kit';

export interface TopTrack {
	title: string;
	artist: string;
	imgUrl: string;
	imgPlaceholderUrl: string;
	playUrl: string;
	previewUrl?: string;
}

export type LastPlayedMedia = TopTrack & { duration: number; playedAt: number };

async function getAccessToken() {
	const basic = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

	const tokenEndpoint = 'https://accounts.spotify.com/api/token';
	const res = await fetch(tokenEndpoint, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
			'cache-control': 'max-age=3600'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: SPOTIFY_REFRESH_TOKEN
		})
	}).catch(() => {
		throw error(503, "Couldn't connect to Spotify");
	});

	if (!res.ok) {
		throw error(res.status, res.statusText);
	}

	return res.json();
}

export async function getSpotifyResponse(endpoint: string) {
	const { access_token } = await getAccessToken();

	return fetch(endpoint, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});
}

export function filterTrackData(track: Track): TopTrack {
	return {
		title: track.name,
		artist: track.artists.map((artist) => artist.name).join(', '),
		imgUrl: track.album.images[0].url,
		imgPlaceholderUrl: track.album.images[2].url,
		playUrl: track.external_urls.spotify,
		previewUrl: track.preview_url
	};
}
