import { browser } from '$app/environment';
import { writable, type Writable, type Updater } from 'svelte/store';

export function persisted(key: string, initialValue: string): Writable<string> {
	const store = writable<string>(initialValue, (set) => {
		if (!browser) return;
		const handleStorage = (event: StorageEvent) => {
			if (event.key === key) {
				set(event.newValue || initialValue);
			}
		};
		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	});

	const { subscribe, set, update } = store;
	return {
		subscribe,
		set(value: string) {
			localStorage?.setItem(key, value);
			set(value);
		},
		update(callback: Updater<string>) {
			update((last) => {
				const value = callback(last);
				localStorage?.setItem(key, value);
				return value;
			});
		}
	};
}

export function togglable(key: string, initialValue: string, value1: string, value2: string) {
	const store = persisted(key, initialValue);
	return {
		...store,
		toggle: () => store.update((v) => (v === value2 ? value1 : value2))
	};
}
