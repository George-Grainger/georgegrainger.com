import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export function persisted<T extends string>(key: string, initialValue: T): Writable<T> {
	const store = writable<T>(initialValue, (set) => {
		const handleStorage = (event: StorageEvent) => {
			if (event.key === key) {
				set((event.newValue as T) || initialValue);
			}
		};
		browser && window.addEventListener('storage', handleStorage);
		return () => browser && window.removeEventListener('storage', handleStorage);
	});
	store.subscribe((value) => browser && localStorage?.setItem(key, value));
	return store;
}
