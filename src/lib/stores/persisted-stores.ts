import { browser } from '$app/environment';
import { writable, type Writable, type Updater } from 'svelte/store';

export function persisted<T extends string>(key: string, initialValue: T): Writable<T> {
	const store = writable<T>(initialValue, (set) => {
		if (!browser) return;
		const handleStorage = (event: StorageEvent) => {
			if (event.key === key) {
				set((event.newValue as T) || initialValue);
			}
		};
		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	});

	const { subscribe, set, update } = store;
	return {
		subscribe,
		set: (value: T) => {
			localStorage?.setItem(key, value);
			set(value);
		},
		update: (callback: Updater<T>) => {
			update((last) => {
				const value = callback(last);
				localStorage?.setItem(key, value);
				return value;
			});
		}
	};
}
