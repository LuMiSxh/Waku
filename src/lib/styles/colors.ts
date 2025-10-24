/**
 * Waku Color Utilities
 * Helpers for working with colors in Waku
 */

/**
 * Convert HSL color to OKLCH format
 *
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns OKLCH color string
 *
 * @example
 * const color = hslToOklch(220, 90, 60);
 * // Returns: "oklch(0.65 0.18 250)"
 */
export function hslToOklch(h: number, s: number, l: number): string {
	// Convert HSL to RGB first
	const sNorm = s / 100;
	const lNorm = l / 100;

	const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = lNorm - c / 2;

	let r = 0,
		g = 0,
		b = 0;

	if (h >= 0 && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (h >= 60 && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (h >= 120 && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (h >= 180 && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (h >= 240 && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (h >= 300 && h < 360) {
		r = c;
		g = 0;
		b = x;
	}

	r = (r + m) * 255;
	g = (g + m) * 255;
	b = (b + m) * 255;

	// Convert RGB to linear RGB
	const toLinear = (c: number) => {
		c = c / 255;
		return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	};

	const rLin = toLinear(r);
	const gLin = toLinear(g);
	const bLin = toLinear(b);

	// Convert linear RGB to Oklab
	const l_oklab = 0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin;
	const m_oklab = 0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin;
	const s_oklab = 0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin;

	const l_ = Math.cbrt(l_oklab);
	const m_ = Math.cbrt(m_oklab);
	const s_ = Math.cbrt(s_oklab);

	const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
	const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
	const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

	// Convert Oklab to OKLCH
	const C = Math.sqrt(a * a + b_ * b_);
	let H = (Math.atan2(b_, a) * 180) / Math.PI;
	if (H < 0) H += 360;

	// Round for cleaner output
	const LRounded = Math.round(L * 100) / 100;
	const CRounded = Math.round(C * 100) / 100;
	const HRounded = Math.round(H);

	return `oklch(${LRounded} ${CRounded} ${HRounded})`;
}

/**
 * Parse an HSL string and convert to OKLCH
 *
 * @param hslString - HSL string in format "hsl(220, 90%, 60%)" or "220 90% 60%"
 * @returns OKLCH color string
 *
 * @example
 * const color = parseHslToOklch("hsl(220, 90%, 60%)");
 * const color2 = parseHslToOklch("220 90% 60%");
 */
export function parseHslToOklch(hslString: string): string {
	// Remove "hsl(" and ")" if present
	const cleaned = hslString.replace(/hsl\(|\)/g, '').trim();

	// Split by comma or space
	const parts = cleaned.split(/[,\s]+/).map((p) => p.replace('%', '').trim());

	if (parts.length !== 3) {
		throw new Error('Invalid HSL string format');
	}

	const h = parseFloat(parts[0]);
	const s = parseFloat(parts[1]);
	const l = parseFloat(parts[2]);

	return hslToOklch(h, s, l);
}

/**
 * Set the accent color for Waku
 * Can accept either OKLCH or HSL format
 *
 * @param color - Color in OKLCH format "oklch(...)" or HSL format "hsl(...)" or "h s% l%"
 *
 * @example
 * setAccentColor("oklch(0.65 0.18 250)");
 * setAccentColor("hsl(220, 90%, 60%)");
 * setAccentColor("220 90% 60%");
 */
export function setAccentColor(color: string): void {
	let oklchColor: string;

	if (color.startsWith('oklch')) {
		oklchColor = color;
	} else if (color.startsWith('hsl') || /^\d+\s+\d+%\s+\d+%$/.test(color.trim())) {
		oklchColor = parseHslToOklch(color);
	} else {
		throw new Error('Color must be in OKLCH or HSL format');
	}

	document.documentElement.style.setProperty('--accent-500', oklchColor);
}
