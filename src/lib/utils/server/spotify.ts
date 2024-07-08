import type { Episode, Track } from 'spotify-types';

import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REFRESH_TOKEN
} from '$env/static/private';
import { error, type NumericRange } from '@sveltejs/kit';

export interface TopTrack {
	title: string;
	creator: string;
	imgUrl: string;
	imgPlaceholderUrl: string;
	playUrl: string;
	previewUrl: string | null;
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
		error(503, "Couldn't connect to Spotify");
	});

	if (!res.ok) {
		error(res.status as NumericRange<400, 599>, res.statusText);
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

export function filterTrackData(track: Track): TopTrack | null {
	if (!track) {
		return null;
	}

	return {
		title: track.name,
		creator: track.artists.map((artist) => artist.name).join(', '),
		imgUrl: track.album.images[0].url,
		imgPlaceholderUrl: track.album.images[2].url,
		playUrl: track.external_urls.spotify,
		previewUrl: track.preview_url
	};
}

export function filterEpisodeData(episode: Episode): TopTrack | null {
	if (!episode) {
		return null;
	}

	return {
		title: episode.name,
		creator: episode.show.name,
		imgUrl: episode.images[0].url,
		imgPlaceholderUrl: episode.images[2].url,
		playUrl: episode.external_urls.spotify,
		previewUrl: episode.audio_preview_url
	};
}
