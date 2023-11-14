import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	throw redirect(308, `/${locals.lang}/#about-me`);
}
