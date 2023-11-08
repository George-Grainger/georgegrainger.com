export async function handle({ event, resolve }) {
	const lang = event.cookies.get('lang') || 'en';
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});

	return response;
}
