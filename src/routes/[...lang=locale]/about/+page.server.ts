import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	redirect(307, `/${locals.lang}/#about-me`);
}
