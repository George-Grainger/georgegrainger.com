import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export function persisted<T extends string>(
	key: string,
	initialValue: T,
	permitted: { [key: string]: T }
): Writable<T> {
	const store = writable<T>(initialValue, (set) => {
		const handleStorage = (e: StorageEvent) => {
			if (e.key === key) {
				set((e.newValue as T) || initialValue);
			}
		};
		browser && window.addEventListener('storage', handleStorage);
		return () => browser && window.removeEventListener('storage', handleStorage);
	});

	store.subscribe((value) => {
		if (!browser) return;

		if (Object.values(permitted).includes(value)) {
			localStorage?.setItem(key, value);
		} else {
			localStorage?.setItem(key, initialValue);
		}
	});

	return store;
}
