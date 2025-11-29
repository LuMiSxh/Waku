import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

/**
 * Custom easing functions matching Apple's spring physics
 */
export const spring = {
	smooth: (t: number): number => {
		// cubic-bezier(0.16, 1, 0.3, 1)
		return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
	},
	snappy: (t: number): number => {
		// cubic-bezier(0.32, 0, 0.67, 0)
		return t === 0
			? 0
			: t === 1
				? 1
				: Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
	},
	bounce: (t: number): number => {
		// cubic-bezier(0.34, 1.56, 0.64, 1)
		const c1 = 1.70158;
		const c3 = c1 + 1;
		return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
	},
};

interface GlassParams {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	opacity?: number;
	blur?: number;
}

/**
 * Glass transition - Fade in with blur effect
 * Perfect for overlays, tooltips, and modals
 *
 * @example
 * ```svelte
 * <div transition:glass>Content</div>
 * <div transition:glass={{ duration: 400, blur: 10 }}>Content</div>
 * ```
 */
export function glass(
	node: Element,
	{ delay = 0, duration = 300, easing = spring.smooth, opacity = 0, blur = 8 }: GlassParams = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const targetOpacity = parseFloat(style.opacity);
	const transform = style.transform === 'none' ? '' : style.transform;

	return {
		delay,
		duration,
		easing,
		css: (t, u) => {
			const currentBlur = u * blur;
			return `
				opacity: ${targetOpacity * t + opacity * u};
				filter: blur(${currentBlur}px);
				transform: ${transform};
			`;
		},
	};
}

interface GlassScaleParams extends GlassParams {
	start?: number;
}

/**
 * Glass scale transition - Combination of scale, opacity, and blur
 * Perfect for modals and dialogs with Apple-like entrance
 *
 * @example
 * ```svelte
 * <div transition:glassScale>Content</div>
 * <div transition:glassScale={{ start: 0.9, duration: 400 }}>Content</div>
 * ```
 */
export function glassScale(
	node: Element,
	{
		delay = 0,
		duration = 400,
		easing = spring.bounce,
		opacity = 0,
		start = 0.95,
		blur = 10,
	}: GlassScaleParams = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const targetOpacity = parseFloat(style.opacity);
	const transform = style.transform === 'none' ? '' : style.transform;

	return {
		delay,
		duration,
		easing,
		css: (t, u) => {
			const currentScale = start + (1 - start) * t;
			const currentBlur = u * blur;
			return `
				opacity: ${targetOpacity * t + opacity * u};
				transform: ${transform} scale(${currentScale});
				filter: blur(${currentBlur}px);
			`;
		},
	};
}

interface GlassSlideParams extends GlassParams {
	x?: number;
	y?: number;
}

/**
 * Glass slide transition - Slide in with blur effect
 * Perfect for dropdowns, sidebars, and slide-in panels
 *
 * @example
 * ```svelte
 * <div transition:glassSlide={{ y: -20 }}>Content</div>
 * <div transition:glassSlide={{ x: 100 }}>Content</div>
 * ```
 */
export function glassSlide(
	node: Element,
	{
		delay = 0,
		duration = 300,
		easing = spring.smooth,
		opacity = 0,
		x = 0,
		y = 0,
		blur = 8,
	}: GlassSlideParams = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const targetOpacity = parseFloat(style.opacity);
	const transform = style.transform === 'none' ? '' : style.transform;

	return {
		delay,
		duration,
		easing,
		css: (t, u) => {
			const currentX = u * x;
			const currentY = u * y;
			const currentBlur = u * blur;
			return `
				opacity: ${targetOpacity * t + opacity * u};
				transform: ${transform} translate(${currentX}px, ${currentY}px);
				filter: blur(${currentBlur}px);
			`;
		},
	};
}

/**
 * Glass expand transition - Expand from center with blur
 * Perfect for popovers and context menus
 *
 * @example
 * ```svelte
 * <div transition:glassExpand>Content</div>
 * ```
 */
export function glassExpand(
	node: Element,
	{
		delay = 0,
		duration = 250,
		easing = spring.snappy,
		opacity = 0,
		start = 0.8,
	}: GlassScaleParams = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const targetOpacity = parseFloat(style.opacity);

	return {
		delay,
		duration,
		easing,
		css: (t, u) => {
			const currentScale = start + (1 - start) * t;
			return `
				opacity: ${targetOpacity * t + opacity * u};
				transform: scale(${currentScale});
				transform-origin: center;
			`;
		},
	};
}

/**
 * Backdrop transition - For modal backdrops
 * Simple fade with subtle blur
 *
 * @example
 * ```svelte
 * <div transition:backdrop class="modal-backdrop">Content</div>
 * ```
 */
export function backdrop(
	node: Element,
	{ delay = 0, duration = 300, easing = cubicOut }: Omit<GlassParams, 'opacity' | 'blur'> = {}
): TransitionConfig {
	return {
		delay,
		duration,
		easing,
		css: (t) => `
			opacity: ${t};
			backdrop-filter: blur(${t * 8}px);
		`,
	};
}
