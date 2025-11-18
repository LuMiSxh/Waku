/**
 * Interactive Glass Effect
 * Creates dynamic highlights, speckles, and edge lighting that respond to:
 * - Mouse/cursor position
 * - Scroll position
 * - Hover state
 * - Focus state
 */

interface InteractiveGlassOptions {
	/**
	 * Enable cursor tracking for highlight movement
	 * @default true
	 */
	enableCursor?: boolean;

	/**
	 * Enable scroll-based animations
	 * @default true
	 */
	enableScroll?: boolean;

	/**
	 * Enable hover glow effect
	 * @default true
	 */
	enableHoverGlow?: boolean;

	/**
	 * Intensity multiplier for effects (0-2)
	 * @default 1
	 */
	intensity?: number;

	/**
	 * Speed of highlight movement (0-1, higher = faster)
	 * @default 0.15
	 */
	speed?: number;

	/**
	 * Enable floating speckles/particles
	 * @default true
	 */
	enableSpeckles?: boolean;
}

const defaultOptions: Required<InteractiveGlassOptions> = {
	enableCursor: true,
	enableScroll: true,
	enableHoverGlow: true,
	intensity: 1,
	speed: 0.15,
	enableSpeckles: true
};

export function interactiveGlass(node: HTMLElement, options: InteractiveGlassOptions = {}) {
	const opts = { ...defaultOptions, ...options };

	let mouseX = 50;
	let mouseY = 50;
	let targetX = 50;
	let targetY = 50;
	let scrollY = 0;
	let isHovering = false;
	let rafId: number | null = null;
	let lastSpeckleUpdate = 0;

	// Add class for CSS targeting
	node.classList.add('interactive-glass');

	// Initialize hover state
	node.style.setProperty('--glass-hover', '0');
	node.style.setProperty('--glass-mouse-x', '50%');
	node.style.setProperty('--glass-mouse-y', '50%');

	/**
	 * Track global mouse position
	 */
	function handleMouseMove(e: MouseEvent) {
		if (!opts.enableCursor) return;

		const rect = node.getBoundingClientRect();
		// Convert to percentage (0-100)
		targetX = ((e.clientX - rect.left) / rect.width) * 100;
		targetY = ((e.clientY - rect.top) / rect.height) * 100;
	}

	/**
	 * Track scroll position
	 */
	function handleScroll() {
		if (!opts.enableScroll) return;
		scrollY = window.scrollY;
	}

	/**
	 * Handle hover state
	 */
	function handleMouseEnter(e: MouseEvent) {
		isHovering = true;
		node.style.setProperty('--glass-hover', '1');

		// Initialize cursor position on enter
		const rect = node.getBoundingClientRect();
		targetX = ((e.clientX - rect.left) / rect.width) * 100;
		targetY = ((e.clientY - rect.top) / rect.height) * 100;
	}

	function handleMouseLeave() {
		isHovering = false;
		node.style.setProperty('--glass-hover', '0');
		// Reset to center when not hovering
		targetX = 50;
		targetY = 50;
	}

	/**
	 * Animation loop - smooth interpolation
	 */
	function animate() {
		const now = Date.now();

		// Smooth lerp (linear interpolation)
		mouseX += (targetX - mouseX) * opts.speed;
		mouseY += (targetY - mouseY) * opts.speed;

		// Apply CSS custom properties
		node.style.setProperty('--glass-mouse-x', `${mouseX}%`);
		node.style.setProperty('--glass-mouse-y', `${mouseY}%`);

		// Scroll-based rotation (subtle parallax)
		if (opts.enableScroll) {
			const scrollOffset = scrollY * 0.05 * opts.intensity;
			node.style.setProperty('--glass-scroll-offset', `${scrollOffset}px`);

			// Rotate highlight gradient based on scroll
			const scrollRotation = (scrollY * 0.1) % 360;
			node.style.setProperty('--glass-scroll-rotation', `${scrollRotation}deg`);
		}

		// Speckle animation (time-based) - only when hovering and throttled to 10fps
		if (opts.enableSpeckles && isHovering && now - lastSpeckleUpdate >= 100) {
			lastSpeckleUpdate = now;
			const time = now * 0.0005; // Slow animation
			node.style.setProperty('--glass-speckle-time', `${time}`);

			// Calculate speckle positions (floating effect)
			const speckle1X = 50 + Math.sin(time * 0.5) * 20;
			const speckle1Y = 50 + Math.cos(time * 0.7) * 20;
			const speckle2X = 50 + Math.sin(time * 0.3 + 2) * 25;
			const speckle2Y = 50 + Math.cos(time * 0.5 + 2) * 25;
			const speckle3X = 50 + Math.sin(time * 0.4 + 4) * 15;
			const speckle3Y = 50 + Math.cos(time * 0.6 + 4) * 15;

			node.style.setProperty('--glass-speckle-1-x', `${speckle1X}%`);
			node.style.setProperty('--glass-speckle-1-y', `${speckle1Y}%`);
			node.style.setProperty('--glass-speckle-2-x', `${speckle2X}%`);
			node.style.setProperty('--glass-speckle-2-y', `${speckle2Y}%`);
			node.style.setProperty('--glass-speckle-3-x', `${speckle3X}%`);
			node.style.setProperty('--glass-speckle-3-y', `${speckle3Y}%`);
		}

		// Hover glow intensity (pulsing)
		if (opts.enableHoverGlow && isHovering) {
			const pulse = 0.5 + Math.sin(now * 0.002) * 0.2;
			node.style.setProperty('--glass-glow-intensity', `${pulse * opts.intensity}`);
		}

		rafId = requestAnimationFrame(animate);
	}

	// Start animation loop
	rafId = requestAnimationFrame(animate);

	// Event listeners
	if (opts.enableCursor) {
		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		node.addEventListener('mouseenter', handleMouseEnter);
		node.addEventListener('mouseleave', handleMouseLeave);
	}

	if (opts.enableScroll) {
		window.addEventListener('scroll', handleScroll, { passive: true });
	}

	// Cleanup
	return {
		destroy() {
			if (rafId !== null) {
				cancelAnimationFrame(rafId);
			}
			node.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
			node.removeEventListener('mouseenter', handleMouseEnter);
			node.removeEventListener('mouseleave', handleMouseLeave);
			node.classList.remove('interactive-glass');
		},

		update(newOptions: InteractiveGlassOptions) {
			Object.assign(opts, newOptions);
		}
	};
}

/**
 * Simplified version - just cursor glow
 */
export function cursorGlow(node: HTMLElement) {
	return interactiveGlass(node, {
		enableScroll: false,
		enableSpeckles: false,
		intensity: 1.5
	});
}

/**
 * Scroll-only reactive glass
 */
export function scrollGlass(node: HTMLElement) {
	return interactiveGlass(node, {
		enableCursor: false,
		enableHoverGlow: false,
		intensity: 1.2
	});
}

/**
 * Full-featured interactive liquid glass
 * All effects enabled with enhanced cursor tracking
 */
export function liquidGlass(node: HTMLElement, enabled: boolean = true) {
	if (!enabled) {
		// Return empty action if disabled
		return {
			destroy() {},
			update() {}
		};
	}

	return interactiveGlass(node, {
		enableCursor: true,
		enableScroll: false, // Scroll is too subtle, focus on cursor
		enableHoverGlow: true,
		enableSpeckles: true,
		intensity: 1.8, // Increased for better visibility
		speed: 0.18 // Faster response to cursor
	});
}

// Alias for backwards compatibility
export const premiumGlass = liquidGlass;
