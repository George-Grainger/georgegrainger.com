export async function load({ data }) {
	// Convert current track data to date object
	data.currentTrack.playedAt = new Date(data.currentTrack.playedAt);
	return data;
}
