import type { ActionReturn } from 'svelte/action';

/**
 * A Svelte action that automatically focuses an element when a condition is met.
 * Useful for focusing inputs when modals open or when forms become active.
 *
 * @param node - The HTML element to focus
 * @param enabled - Whether to focus the element. Defaults to `true`
 * @returns {ActionReturn<boolean>} An object containing `update` and `destroy` methods
 */
export function autoFocus(node: HTMLElement, enabled: boolean = true): ActionReturn<boolean> {
	function focus() {
		if (enabled && node) {
			// Use requestAnimationFrame to ensure the element is rendered
			requestAnimationFrame(() => {
				node.focus();
			});
		}
	}

	// Initialize
	focus();

	return {
		update(newEnabled: boolean) {
			enabled = newEnabled;
			focus();
		},
		destroy() {
			// Nothing to clean up
		},
	};
}
