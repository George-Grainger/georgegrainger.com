import { defaultLocale, locales } from '$lib/translations';

export async function handle({ event, resolve }) {
	const { url, request, isDataRequest } = event;
	const { pathname, origin } = url;

	// Catch routes that shouldn't be i18n
	if (pathname.startsWith('/api')) {
		event.locals.lang = defaultLocale;
		return resolve(event);
	}

	// Test if they've navigated to a path with a specified locale
	const supportedLocales = locales.get();
	let locale = supportedLocales.find((l) => l === `${pathname.match(/[^/]+?(?=\/|$)/)}`);
	if (locale === defaultLocale && !request.headers.get('prevent-redirect')) {
		const localeRegex = new RegExp(`^/${defaultLocale}`);
		const location = `${pathname}`.replace(localeRegex, '') || '/';
		const cookie = `lang=${defaultLocale} ; expires=3600 ; path = /; SameSite=strict ;`;
		return new Response(undefined, { headers: { location, 'Set-Cookie': cookie }, status: 301 });
	}

	if (!locale) {
		locale = event.cookies.get('lang');

		if (!isDataRequest) {
			// If can't find cookie get it from the header
			const userLanguages = `${request.headers.get('accept-language')}`;
			const localeRegex = new RegExp(/[a-zA-Z]+?(?=-|_|,|;)/);
			locale = locale ?? `${userLanguages.match(localeRegex)}`;
		}

		// Set default locale if user preferred locale does not match
		if (!locale || !supportedLocales.includes(locale)) locale = defaultLocale;

		const routeRegex = new RegExp(/^\/[^.]*([?#].*)?$/);
		if (!routeRegex.test(pathname)) {
			return resolve(event);
		}

		if (locale === defaultLocale) {
			const path = `${pathname}`.replace(/\/$/, '');
			const redirectTo = `${origin}/${locale}${path}${
				isDataRequest ? '/__data.json?x-sveltekit-invalidated=100' : ''
			}`;

			// We want to prevent redirect to fetch data for the default locale
			request.headers.set('prevent-redirect', '1');

			// Fetch the redirected route
			const response = await fetch(redirectTo, request);

			// Get response body and set html headers
			const data = await response.text();

			// Serve the redirected route.
			// In this case we don't have to set the html 'lang' attribute
			// as the default locale is already included in our app.html.
			return new Response(data, {
				...response,
				headers: {
					...response.headers,
					'Content-Type': isDataRequest ? 'application/json' : 'text/html'
				}
			});
		}

		// 301 redirect
		return new Response(undefined, { headers: { location: `/${locale}${pathname}` }, status: 301 });
	}

	event.locals.lang = locale;
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale ?? defaultLocale)
	});
}
