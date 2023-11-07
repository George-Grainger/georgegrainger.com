// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module 'svelte' {
	export function getContext(
		key: 'translations'
	): Awaited<ReturnType<typeof import('$lib/utils/client/i18n')['loadTranslations']>>;
}

export {};
