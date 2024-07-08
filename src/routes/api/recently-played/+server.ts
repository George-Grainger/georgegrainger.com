import { filterTrackData, filterEpisodeData, getSpotifyResponse } from '$lib/utils/server/spotify';
import { json } from '@sveltejs/kit';
import type { CurrentlyPlaying, Episode, Track } from 'spotify-types';

function filterAudio(data: CurrentlyPlaying) {
	if (!data.item) {
		return;
	}

	let audio;
	switch (data.currently_playing_type) {
		case 'track':
			audio = filterTrackData(data.item as Track);
			break;
		case 'episode':
			audio = filterEpisodeData(data.item as Episode);
			break;
		default:
			return;
	}

	const duration = (data.item?.duration_ms || 0) / 1000;
	const playedAt = new Date(Date.now() - (data.progress_ms || 0));
	return {
		...audio,
		duration,
		playedAt,
		isPlaying: true,
		isOffline: false
	};
}

export async function GET({ setHeaders }) {
	const nowPlayingEndpoint = `https://api.spotify.com/v1/me/player/currently-playing`;
	const recentlyPlayedEndpoint = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
	const [npRes, rpRes] = await Promise.all([
		getSpotifyResponse(nowPlayingEndpoint).catch((e) => e),
		getSpotifyResponse(recentlyPlayedEndpoint).catch((e) => e)
	]);

	// Currently playing audio
	if (npRes.ok && npRes.status != 204) {
		const data = await npRes.json();
		const audio = filterAudio(data);

		if (audio) {
			setHeaders({ 'cache-control': 'public, max-age=10', 'X-Robots-Tag': 'noindex, nofollow' });
			return json(audio);
		}
	}

	// Get most recent track
	if (rpRes.ok) {
		const { items } = await rpRes.json();
		const data = items[0];
		const track = filterTrackData(data.track);
		const duration = data.track.duration_ms / 1000;
		const playedAt = data.played_at;
		setHeaders({ 'cache-control': 'public, max-age=180' });

		return json({
			...track,
			duration,
			playedAt,
			isPlaying: false,
			isOffline: false
		});
	}

	// Spotify is currently down
	const track = (await import('$lib/api-backup/recently-played')).default;
	return json(track);
}
