/* eslint-disable @typescript-eslint/no-explicit-any */

export type Action<T = any> = (
	node: HTMLElement,
	parameters?: T
) => {
	update?: (parameters: T) => any | void;
	destroy?: () => void;
};

export function clickoutside(
	node: HTMLElement,
	params: { enabled: boolean; callback: (...args: any[]) => unknown }
): ReturnType<Action> {
	const { enabled: initialEnabled, callback } = params;

	const handleOutsideClick = () => {
		if (!node.contains(document.activeElement)) callback(node);
	};

	function update({ enabled }: { enabled: boolean }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		}
	};
}
