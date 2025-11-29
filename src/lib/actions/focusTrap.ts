import type { ActionReturn } from 'svelte/action';

/**
 * A Svelte action that traps focus within a specified element.
 * It also allows focusing the first focusable element when enabled.
 * On top of that it allows for focusing elements outside the trap if they have a specific data attribute
 * (`data-focus-trap-allowed`).
 *
 * @param node - The DOM element to trap focus within.
 * @param enabled - Whether the focus trap is enabled. Can be a boolean or a tuple [enabled, shouldFocus].
 * Defaults to `true`.
 * @returns {ActionReturn<boolean | [boolean, boolean]>} An object containing `update` and `destroy` methods
 */
export function focusTrap(
	node: HTMLElement,
	enabled: boolean | [boolean, boolean] = true
): ActionReturn<boolean | [boolean, boolean]> {
	let isEnabled: boolean;
	let shouldFocus: boolean;

	function updateParams(params: boolean | [boolean, boolean]) {
		if (Array.isArray(params)) {
			isEnabled = params[0];
			shouldFocus = params[1] ?? false;
		} else {
			isEnabled = params;
			shouldFocus = false;
		}
	}

	updateParams(enabled);

	let focusableElements: HTMLElement[] = [];

	function updateFocusableElements() {
		const focusableSelector =
			'input, button, textarea, select, a[href], area[href], iframe, object, embed, [contenteditable="true"], [tabindex]:not([tabindex="-1"]), audio[controls], video[controls]';

		const internalElements = Array.from(
			node.querySelectorAll<HTMLElement>(focusableSelector)
		).filter((el) => !el.hasAttribute('disabled') && !el.hidden && el.offsetParent !== null);

		const externalElements = Array.from(
			document.querySelectorAll<HTMLElement>(
				'[data-focus-trap-allowed] ' +
					focusableSelector +
					', [data-focus-trap-allowed][tabindex]:not([tabindex="-1"])'
			)
		).filter(
			(el) =>
				!el.hasAttribute('disabled') && !el.hidden && el.offsetParent !== null && !node.contains(el)
		);

		focusableElements = [...internalElements, ...externalElements];
	}

	function handleGlobalFocus(event: FocusEvent) {
		if (!isEnabled) return;

		const target = event.target as HTMLElement;
		if (!target || node.contains(target)) return;

		// Allow focus on elements with the data attribute or their descendants
		if (target.closest('[data-focus-trap-allowed]')) {
			return;
		}

		// Always redirect focus back into the trap when it goes outside
		updateFocusableElements();
		if (focusableElements.length > 0) {
			event.preventDefault();
			focusableElements[0].focus();
		}
	}

	function handleMouseDown(event: MouseEvent) {
		if (!isEnabled || shouldFocus) return;

		const target = event.target as HTMLElement;

		// If clicking on a non-focusable element inside the trap and shouldFocus is false,
		// prevent the default behavior that might cause focus redirection
		if (node.contains(target)) {
			updateFocusableElements();
			const isFocusable =
				focusableElements.includes(target) || focusableElements.some((el) => el.contains(target));

			if (!isFocusable) {
				event.preventDefault();
			}
		}
	}

	function trapFocus(event: KeyboardEvent) {
		if (!isEnabled || event.key !== 'Tab') return;

		updateFocusableElements();

		if (focusableElements.length === 0) return;

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.shiftKey) {
			if (document.activeElement === firstElement) {
				event.preventDefault();
				lastElement.focus();
			}
		} else {
			if (document.activeElement === lastElement) {
				event.preventDefault();
				firstElement.focus();
			}
		}
	}

	function initialize() {
		if (isEnabled) {
			updateFocusableElements();
			if (shouldFocus && focusableElements.length > 0) {
				requestAnimationFrame(() => focusableElements[0].focus());
			}
		}
	}

	initialize();

	node.addEventListener('keydown', trapFocus);
	node.addEventListener('mousedown', handleMouseDown);
	document.addEventListener('focusin', handleGlobalFocus, true);

	return {
		update(newParams: boolean | [boolean, boolean]) {
			updateParams(newParams);
			if (isEnabled) {
				initialize();
			}
		},
		destroy() {
			node.removeEventListener('keydown', trapFocus);
			node.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('focusin', handleGlobalFocus, true);
		},
	};
}
