export const load = async ({ fetch }) => {
	const fetchPosts = async () => {
		const res = await fetch('/api/top-tracks');
		console.log(res.headers);
		const data = await res.json();
		return data;
	};

	return { test: fetchPosts() };
};
