/**
 * Button Cursor Tracker
 * Tracks cursor position within button for glassy hover effects
 */

export function buttonCursor(node: HTMLElement) {
	function handleMouseMove(e: MouseEvent) {
		const rect = node.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;

		node.style.setProperty('--btn-cursor-x', `${x}%`);
		node.style.setProperty('--btn-cursor-y', `${y}%`);
	}

	function handleMouseLeave() {
		// Reset to center when cursor leaves
		node.style.setProperty('--btn-cursor-x', '50%');
		node.style.setProperty('--btn-cursor-y', '50%');
	}

	node.addEventListener('mousemove', handleMouseMove, { passive: true });
	node.addEventListener('mouseleave', handleMouseLeave);

	return {
		destroy() {
			node.removeEventListener('mousemove', handleMouseMove);
			node.removeEventListener('mouseleave', handleMouseLeave);
		}
	};
}
