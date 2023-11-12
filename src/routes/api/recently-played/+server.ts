import { filterTrackData, getSpotifyResponse } from '$lib/utils/server/spotify';
import { json } from '@sveltejs/kit';

export async function GET({ setHeaders }) {
	const nowPlayingEndpoint = `https://api.spotify.com/v1/me/player/currently-playing`;
	const recentlyPlayedEndpoint = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
	const [npRes, rpRes] = await Promise.all([
		getSpotifyResponse(nowPlayingEndpoint).catch((e) => e),
		getSpotifyResponse(recentlyPlayedEndpoint).catch((e) => e)
	]);

	// Currently playing a track
	if (npRes.ok && npRes.status != 204) {
		const data = await npRes.json();
		const track = filterTrackData(data.item);
		const duration = data.item.duration_ms / 1000;
		const playedAt = new Date(Date.now() - data.progress_ms);
		setHeaders({ 'cache-control': 'public, max-age=10', 'X-Robots-Tag': 'noindex, nofollow' });

		return json({
			...track,
			duration,
			playedAt,
			isPlaying: true,
			isOffline: false
		});
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
