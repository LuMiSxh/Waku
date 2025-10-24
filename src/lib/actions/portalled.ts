import type { ActionReturn } from 'svelte/action';

/**
 * A Svelte action that moves a DOM node to a different parent element.
 *
 * @param {HTMLElement} node - The DOM node to be moved.
 * @param {HTMLElement | null} [parent=null] - The target parent element.
 * Defaults to `document.body`.
 * @returns {ActionReturn<HTMLElement | null>} An object containing `update` and `destroy` methods.
 */
export function portalled(
	node: HTMLElement,
	parent: HTMLElement | null = null
): ActionReturn<HTMLElement | null> {
	let currentParent = parent || document.body;

	// Remove from the original location
	if (node.parentNode) {
		node.parentNode.removeChild(node);
	}

	// Append to target parent
	currentParent.appendChild(node);

	return {
		/**
		 * Updates the parent element of the node.
		 *
		 * @param {HTMLElement | null} newParent - The new parent element. Defaults to `document.body`.
		 */
		update(newParent: HTMLElement | null) {
			currentParent = newParent || document.body;
			if (node.parentNode !== currentParent) {
				node.parentNode?.removeChild(node);
				currentParent.appendChild(node);
			}
		},
		/**
		 * Removes the node from its parent element.
		 */
		destroy() {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}
	};
}
