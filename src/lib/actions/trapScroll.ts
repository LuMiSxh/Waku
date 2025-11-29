import type { ActionReturn } from 'svelte/action';

/**
 * A Svelte action that prevents scrolling on the body element when enabled.
 * Useful for modals and overlays to prevent background scrolling.
 *
 * @param node - The HTML element (not used, but required for action signature)
 * @param enabled - Whether scroll trapping is enabled
 * @returns {ActionReturn<boolean>} An object containing `update` and `destroy` methods
 */
export function trapScroll(node: HTMLElement, enabled: boolean = true): ActionReturn<boolean> {
	let previousOverflow: string;
	let previousPaddingRight: string;

	function trap() {
		if (!enabled) return;

		// Store original values
		previousOverflow = document.body.style.overflow;
		previousPaddingRight = document.body.style.paddingRight;

		// Calculate scrollbar width to prevent layout shift
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		// Apply styles
		document.body.style.overflow = 'hidden';
		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		}
	}

	function release() {
		// Restore original values
		document.body.style.overflow = previousOverflow;
		document.body.style.paddingRight = previousPaddingRight;
	}

	// Initialize
	trap();

	return {
		update(newEnabled: boolean) {
			enabled = newEnabled;
			if (enabled) {
				trap();
			} else {
				release();
			}
		},
		destroy() {
			release();
		},
	};
}
