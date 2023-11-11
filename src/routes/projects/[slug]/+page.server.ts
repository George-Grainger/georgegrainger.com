export async function load({ cookies }) {
	const lang = cookies.get('lang') ?? 'en';

	return { lang };
}
