export const load = async ({ fetch }) => {
	const responses = await Promise.all([
		fetch('/api/top-tracks'),
		fetch('/api/now-playing'),
		fetch('/api/recently-played')
	]);

	const data = await Promise.all(
		responses.filter((res: Response) => res.status == 200).map((res: Response) => res.json())
	);

	const [topTracks, currentTrack] = data.slice(0, 2);

	return { currentTrack, topTracks };
};
