import type { ActionReturn } from 'svelte/action';

/**
 * A Svelte action that calls a handler function when a click occurs outside the given node.
 * Useful for closing dropdowns or modals when clicking outside of them.
 *
 * @param node - The HTML element to detect outside clicks for.
 * @param handler - The function to call when an outside click is detected.
 * @returns {ActionReturn<HTMLElement | null>} An object containing `update` and `destroy` methods.
 */
export function clickOutside(node: HTMLElement, handler: () => void): ActionReturn<() => void> {
	const onClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented) {
			handler();
		}
	};

	document.addEventListener('click', onClick, true);

	return {
		update(newHandler: () => void) {
			handler = newHandler;
		},
		destroy() {
			document.removeEventListener('click', onClick, true);
		}
	};
}
