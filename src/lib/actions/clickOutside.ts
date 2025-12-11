import type { ActionReturn } from 'svelte/action';

/**
 * A Svelte action that calls a handler function when a click occurs outside the given node.
 * Useful for closing dropdowns or modals when clicking outside of them.
 *
 * @param node - The HTML element to detect outside clicks for.
 * @param handler - A function to call when an outside click is detected, or an object containing the handler and optional ignore list.
 * @returns {ActionReturn<() => void>>} An object containing a `destroy` method.
 */
export function clickOutside(
	node: HTMLElement,
	handlerOrParams: (() => void) | { handler: () => void; ignore?: string[] }
): ActionReturn<() => void> {
	// Normalize params
	const handler = typeof handlerOrParams === 'function' ? handlerOrParams : handlerOrParams.handler;
	const ignore = typeof handlerOrParams === 'object' ? handlerOrParams.ignore : [];

	const onClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		// Check if click is inside an ignored element
		const isIgnored = ignore?.some((id) => {
			const el = document.getElementById(id);
			return el && el.contains(target);
		});

		if (node && !node.contains(target) && !event.defaultPrevented && !isIgnored) {
			handler();
		}
	};

	document.addEventListener('click', onClick, true);

	return {
		destroy() {
			document.removeEventListener('click', onClick, true);
		},
	};
}
