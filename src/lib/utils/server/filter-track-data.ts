import type { Track } from 'spotify-types';

export default async function filterTrackData(tracks: Track[]) {
	return tracks.map((track) => ({
		title: track.name,
		creator: track.artists.map((_artist) => _artist.name).join(', '),
		imgUrl: track.album.images[0].url,
		imgPlaceholder: track.album.images[2].url,
		playUrl: track.external_urls.spotify,
		previewUrl: track.preview_url
	}));
}
