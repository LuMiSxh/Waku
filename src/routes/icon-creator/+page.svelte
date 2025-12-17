<script lang="ts">
	import { Button } from '$lib/index.js';
	import {
		IconDownload,
		IconRefresh,
		IconX,
		IconTrash,
		IconPhoto,
		IconSparkles,
		IconSearch,
		IconCheck,
	} from '@tabler/icons-svelte';
	import * as TablerIcons from '@tabler/icons-svelte';

	type Layer = {
		id: string;
		type: 'image' | 'icon' | 'shape';
		x: number;
		y: number;
		width: number;
		height: number;
		rotation: number;
		opacity: number;
		content?: string;
		iconComponent?: typeof TablerIcons.IconPlus;
		color?: string;
		glassEffect?: 'none' | 'light' | 'strong' | 'bento';
		blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay';
		overflow?: {
			enabled: boolean;
			top: boolean;
			right: boolean;
			bottom: boolean;
			left: boolean;
		};
	};

	let accentHue = $state(280);
	let accentSaturation = $state(0.2);
	let accentLightness = $state(0.65);
	let iconSize = $state(512);
	let borderRadius = $state(22);
	let glassOpacity = $state(0.15);
	let backgroundGlassEffect = $state<'none' | 'light' | 'strong' | 'bento'>('light');
	let backgroundPattern = $state<'none' | 'noise' | 'dots' | 'grid'>('none');
	let glassAccentHue = $state(0);
	let glassAccentSaturation = $state(0);
	let glassAccentLightness = $state(1);
	let glassHighlightOpacity = $state(0.5);
	let glassHighlightHue = $state(0);
	let glassHighlightSaturation = $state(0);
	let glassHighlightLightness = $state(1);
	let glassColorInput = $state('');
	let borderEnabled = $state(false);
	let borderWidth = $state(1);
	let borderColor = $state('#ffffff');
	let borderOpacity = $state(0.5);
	let borderGlow = $state(false);
	let shadowEnabled = $state(true);
	let shadowIntensity = $state(0.3);
	let gradientOverlay = $state<'none' | 'subtle' | 'strong' | 'radial'>('none');
	let layers = $state<Layer[]>([]);
	let selectedLayerId = $state<string | null>(null);
	let isDragging = $state(false);
	let isResizing = $state(false);
	let dragStartX = $state(0);
	let dragStartY = $state(0);
	let resizeStartWidth = $state(0);
	let resizeStartHeight = $state(0);
	let colorInput = $state('');
	let showIconPicker = $state(false);
	let iconSearchQuery = $state('');

	let accentColor = $derived(`oklch(${accentLightness} ${accentSaturation} ${accentHue})`);
	let glassAccentColor = $derived(
		`oklch(${glassAccentLightness} ${glassAccentSaturation} ${glassAccentHue})`
	);
	let glassHighlightColorOklch = $derived(
		`oklch(${glassHighlightLightness} ${glassHighlightSaturation} ${glassHighlightHue})`
	);
	let selectedLayer = $derived(layers.find((l) => l.id === selectedLayerId));

	function parseColorInput(input: string) {
		const trimmed = input.trim();

		const oklchMatch = trimmed.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
		if (oklchMatch) {
			accentLightness = parseFloat(oklchMatch[1]);
			accentSaturation = parseFloat(oklchMatch[2]);
			accentHue = parseFloat(oklchMatch[3]);
			return true;
		}

		if (trimmed.startsWith('#')) {
			const hex = trimmed.substring(1);
			if (hex.length === 6) {
				const r = parseInt(hex.substring(0, 2), 16) / 255;
				const g = parseInt(hex.substring(2, 4), 16) / 255;
				const b = parseInt(hex.substring(4, 6), 16) / 255;

				const max = Math.max(r, g, b);
				const min = Math.min(r, g, b);
				const l = (max + min) / 2;

				if (max === min) {
					accentHue = 0;
					accentSaturation = 0;
				} else {
					const d = max - min;
					const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

					switch (max) {
						case r:
							accentHue = ((g - b) / d + (g < b ? 6 : 0)) * 60;
							break;
						case g:
							accentHue = ((b - r) / d + 2) * 60;
							break;
						case b:
							accentHue = ((r - g) / d + 4) * 60;
							break;
					}

					accentSaturation = Math.min(s * 0.4, 0.4);
				}

				accentLightness = Math.max(0.3, Math.min(0.9, l));
				return true;
			}
		}

		return false;
	}

	function handleColorPaste() {
		if (parseColorInput(colorInput)) {
			colorInput = '';
		}
	}

	function parseGlassColorInput(input: string) {
		const trimmed = input.trim();

		const oklchMatch = trimmed.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
		if (oklchMatch) {
			glassHighlightLightness = parseFloat(oklchMatch[1]);
			glassHighlightSaturation = parseFloat(oklchMatch[2]);
			glassHighlightHue = parseFloat(oklchMatch[3]);
			return true;
		}

		if (trimmed.startsWith('#')) {
			const hex = trimmed.substring(1);
			if (hex.length === 6) {
				const r = parseInt(hex.substring(0, 2), 16) / 255;
				const g = parseInt(hex.substring(2, 4), 16) / 255;
				const b = parseInt(hex.substring(4, 6), 16) / 255;

				const max = Math.max(r, g, b);
				const min = Math.min(r, g, b);
				const l = (max + min) / 2;

				if (max === min) {
					glassHighlightHue = 0;
					glassHighlightSaturation = 0;
				} else {
					const d = max - min;
					const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

					switch (max) {
						case r:
							glassHighlightHue = ((g - b) / d + (g < b ? 6 : 0)) * 60;
							break;
						case g:
							glassHighlightHue = ((b - r) / d + 2) * 60;
							break;
						case b:
							glassHighlightHue = ((r - g) / d + 4) * 60;
							break;
					}

					glassHighlightSaturation = Math.min(s * 0.4, 0.4);
				}

				glassHighlightLightness = Math.max(0, Math.min(1, l));
				return true;
			}
		}

		return false;
	}

	function handleGlassColorPaste() {
		if (parseGlassColorInput(glassColorInput)) {
			glassColorInput = '';
		}
	}

	const availableIcons = Object.entries(TablerIcons)
		.filter(([name]) => name.startsWith('Icon') && name !== 'Icon')
		.map(([name, component]) => ({
			name: name.replace('Icon', ''),
			component: component as typeof TablerIcons.IconPlus,
		}));

	let filteredIcons = $derived(
		availableIcons.filter((icon) => icon.name.toLowerCase().includes(iconSearchQuery.toLowerCase()))
	);

	function handleImageUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const url = e.target?.result as string;
			const id = crypto.randomUUID();
			layers = [
				...layers,
				{
					id,
					type: 'image',
					content: url,
					x: 256,
					y: 256,
					width: 200,
					height: 200,
					rotation: 0,
					opacity: 1,
					glassEffect: 'none',
					blendMode: 'normal',
					overflow: {
						enabled: false,
						top: false,
						right: false,
						bottom: false,
						left: false,
					},
				},
			];
			selectedLayerId = id;
		};
		reader.readAsDataURL(file);
		input.value = '';
	}

	function addIcon(iconName: string, component: typeof TablerIcons.IconPlus) {
		const id = crypto.randomUUID();
		layers = [
			...layers,
			{
				id,
				type: 'icon',
				content: iconName,
				iconComponent: component,
				x: 256,
				y: 256,
				width: 120,
				height: 120,
				rotation: 0,
				opacity: 1,
				color: '#ffffff',
				glassEffect: 'none',
				blendMode: 'normal',
				overflow: {
					enabled: false,
					top: false,
					right: false,
					bottom: false,
					left: false,
				},
			},
		];
		selectedLayerId = id;
		showIconPicker = false;
		iconSearchQuery = '';
	}

	function removeLayer(id: string) {
		layers = layers.filter((l) => l.id !== id);
		if (selectedLayerId === id) {
			selectedLayerId = null;
		}
	}

	function updateLayer(id: string, updates: Partial<Layer>) {
		layers = layers.map((l) => (l.id === id ? { ...l, ...updates } : l));
	}

	function handleMouseDown(e: MouseEvent, layerId: string, action: 'drag' | 'resize') {
		e.stopPropagation();
		selectedLayerId = layerId;
		const layer = layers.find((l) => l.id === layerId);
		if (!layer) return;

		if (action === 'drag') {
			isDragging = true;
			dragStartX = e.clientX - layer.x;
			dragStartY = e.clientY - layer.y;
		} else {
			isResizing = true;
			dragStartX = e.clientX;
			dragStartY = e.clientY;
			resizeStartWidth = layer.width;
			resizeStartHeight = layer.height;
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (!selectedLayerId) return;
		const layer = layers.find((l) => l.id === selectedLayerId);
		if (!layer) return;

		if (isDragging) {
			updateLayer(selectedLayerId, {
				x: e.clientX - dragStartX,
				y: e.clientY - dragStartY,
			});
		} else if (isResizing) {
			const deltaX = e.clientX - dragStartX;
			const deltaY = e.clientY - dragStartY;
			const delta = Math.max(deltaX, deltaY);

			updateLayer(selectedLayerId, {
				width: Math.max(20, resizeStartWidth + delta),
				height: Math.max(20, resizeStartHeight + delta),
			});
		}
	}

	function handleMouseUp() {
		isDragging = false;
		isResizing = false;
	}

	async function downloadIcon() {
		const canvas = document.createElement('canvas');
		// Export size is 768x768 (512 icon + 128px padding on each side)
		const scale = iconSize / 768;
		const padding = 128 * scale;
		const iconSizeScaled = 512 * scale;
		const radiusScaled = (borderRadius / 100) * iconSizeScaled;

		canvas.width = iconSize;
		canvas.height = iconSize;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Fill background (transparent for overflow area)
		ctx.clearRect(0, 0, iconSize, iconSize);

		// Helper function to create rounded rectangle path
		function createRoundedRectPath(x: number, y: number, w: number, h: number, r: number) {
			if (!ctx) return;
			ctx.beginPath();
			if (ctx.roundRect) {
				ctx.roundRect(x, y, w, h, r);
			} else {
				ctx.moveTo(x + r, y);
				ctx.arcTo(x + w, y, x + w, y + h, r);
				ctx.arcTo(x + w, y + h, x, y + h, r);
				ctx.arcTo(x, y + h, x, y, r);
				ctx.arcTo(x, y, x + w, y, r);
				ctx.closePath();
			}
		}

		// Draw icon background with rounded corners
		ctx.save();
		createRoundedRectPath(padding, padding, iconSizeScaled, iconSizeScaled, radiusScaled);
		ctx.clip();
		ctx.fillStyle = accentColor;
		ctx.fillRect(padding, padding, iconSizeScaled, iconSizeScaled);

		// Draw background glass effect
		if (backgroundGlassEffect !== 'none') {
			const glassAlpha =
				backgroundGlassEffect === 'light'
					? glassOpacity
					: backgroundGlassEffect === 'strong'
						? glassOpacity * 2
						: glassOpacity;
			const gradient = ctx.createLinearGradient(
				padding,
				padding,
				padding,
				padding + iconSizeScaled
			);
			gradient.addColorStop(0, `rgba(255, 255, 255, ${glassAlpha})`);
			gradient.addColorStop(1, `rgba(255, 255, 255, ${glassAlpha * 0.3})`);
			ctx.fillStyle = gradient;
			ctx.fillRect(padding, padding, iconSizeScaled, iconSizeScaled);
		}
		ctx.restore();

		// Draw layers
		for (const layer of layers) {
			ctx.save();
			ctx.globalAlpha = layer.opacity;
			if (layer.blendMode && layer.blendMode !== 'normal') {
				ctx.globalCompositeOperation = layer.blendMode;
			}

			// Apply clipping based on overflow settings
			if (layer.overflow?.enabled) {
				// Create custom clip path based on overflow settings
				const iconLeft = padding;
				const iconTop = padding;
				const iconRight = padding + iconSizeScaled;
				const iconBottom = padding + iconSizeScaled;

				const clipLeft = layer.overflow.left ? 0 : iconLeft;
				const clipTop = layer.overflow.top ? 0 : iconTop;
				const clipRight = layer.overflow.right ? iconSize : iconRight;
				const clipBottom = layer.overflow.bottom ? iconSize : iconBottom;

				// Create clip path with selective rounding
				ctx.beginPath();

				// For overflow sides, use straight edges. For non-overflow, use rounded corners.
				if (!layer.overflow.top && !layer.overflow.left) {
					// Top-left corner (rounded)
					ctx.moveTo(clipLeft + radiusScaled, clipTop);
				} else {
					ctx.moveTo(clipLeft, clipTop);
				}

				// Top edge
				if (!layer.overflow.top && !layer.overflow.right) {
					ctx.arcTo(clipRight, clipTop, clipRight, clipBottom, radiusScaled);
				} else {
					ctx.lineTo(clipRight, clipTop);
				}

				// Right edge
				if (!layer.overflow.right && !layer.overflow.bottom) {
					ctx.arcTo(clipRight, clipBottom, clipLeft, clipBottom, radiusScaled);
				} else {
					ctx.lineTo(clipRight, clipBottom);
				}

				// Bottom edge
				if (!layer.overflow.bottom && !layer.overflow.left) {
					ctx.arcTo(clipLeft, clipBottom, clipLeft, clipTop, radiusScaled);
				} else {
					ctx.lineTo(clipLeft, clipBottom);
				}

				// Left edge
				if (!layer.overflow.left && !layer.overflow.top) {
					ctx.arcTo(clipLeft, clipTop, clipRight, clipTop, radiusScaled);
				} else {
					ctx.lineTo(clipLeft, clipTop);
				}

				ctx.closePath();
				ctx.clip();
			} else {
				// No overflow - clip to rounded rectangle
				createRoundedRectPath(padding, padding, iconSizeScaled, iconSizeScaled, radiusScaled);
				ctx.clip();
			}

			// Layer positions are relative to 512x512 space, need to add padding offset
			const centerX = (layer.x + 128) * scale;
			const centerY = (layer.y + 128) * scale;
			const width = layer.width * scale;
			const height = layer.height * scale;

			ctx.translate(centerX, centerY);
			ctx.rotate((layer.rotation * Math.PI) / 180);

			if (layer.type === 'image' && layer.content) {
				const image = new Image();
				image.src = layer.content;
				await new Promise((resolve) => {
					image.onload = resolve;
				});
				ctx.drawImage(image, -width / 2, -height / 2, width, height);
			} else if (layer.type === 'icon') {
				ctx.fillStyle = layer.color || '#ffffff';
				ctx.font = `${width * 0.8}px Arial`;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText('⭐', 0, 0);
			}

			if (layer.glassEffect && layer.glassEffect !== 'none' && layer.type === 'image') {
				const glassAlpha =
					layer.glassEffect === 'light' ? 0.1 : layer.glassEffect === 'strong' ? 0.3 : 0.15;
				const gradient = ctx.createLinearGradient(-width / 2, -height / 2, -width / 2, height / 2);
				gradient.addColorStop(0, `rgba(255, 255, 255, ${glassAlpha})`);
				gradient.addColorStop(1, `rgba(255, 255, 255, ${glassAlpha * 0.3})`);
				ctx.fillStyle = gradient;
				ctx.fillRect(-width / 2, -height / 2, width, height);
			}

			ctx.restore();
		}

		const link = document.createElement('a');
		link.download = `waku-icon-${Date.now()}.png`;
		link.href = canvas.toDataURL('image/png');
		link.click();
	}

	function reset() {
		accentHue = 280;
		accentSaturation = 0.2;
		accentLightness = 0.65;
		borderRadius = 22;
		glassOpacity = 0.15;
		backgroundGlassEffect = 'light';
		backgroundPattern = 'none';
		glassAccentHue = 0;
		glassAccentSaturation = 0;
		glassAccentLightness = 1;
		glassHighlightHue = 0;
		glassHighlightSaturation = 0;
		glassHighlightLightness = 1;
		glassHighlightOpacity = 0.5;
		borderEnabled = false;
		borderWidth = 1;
		borderColor = '#ffffff';
		borderOpacity = 0.5;
		borderGlow = false;
		shadowEnabled = true;
		shadowIntensity = 0.3;
		gradientOverlay = 'none';
		layers = [];
		selectedLayerId = null;
	}

	function copyColorCode() {
		navigator.clipboard.writeText(accentColor);
	}

	function selectLayer(id: string) {
		selectedLayerId = id;
	}

	function getGlassStyles(effect: string) {
		const hasAccent = glassAccentSaturation > 0;
		const accentRgb = hasAccent
			? oklchToRgb(glassAccentLightness, glassAccentSaturation, glassAccentHue)
			: null;

		// Use custom highlight color from OKLCH
		const highlightRgb = oklchToRgb(
			glassHighlightLightness,
			glassHighlightSaturation,
			glassHighlightHue
		);
		const highlightRgba = `rgba(${highlightRgb.r}, ${highlightRgb.g}, ${highlightRgb.b}, ${glassHighlightOpacity})`;
		const highlightRgbaLight = `rgba(${highlightRgb.r}, ${highlightRgb.g}, ${highlightRgb.b}, ${glassHighlightOpacity * 0.3})`;

		switch (effect) {
			case 'light':
				if (hasAccent && accentRgb) {
					return `background: linear-gradient(to bottom, rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.15), rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.05));`;
				}
				return `background: linear-gradient(to bottom, ${highlightRgba}, transparent);`;
			case 'strong':
				if (hasAccent && accentRgb) {
					return `background: linear-gradient(to bottom, rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.35), rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.15));`;
				}
				return `background: linear-gradient(to bottom, ${highlightRgba}, ${highlightRgbaLight});`;
			case 'bento':
				if (hasAccent && accentRgb) {
					return `background: linear-gradient(135deg, rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.2), rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.08)); backdrop-filter: blur(10px);`;
				}
				return `background: linear-gradient(135deg, ${highlightRgba}, ${highlightRgbaLight}); backdrop-filter: blur(10px);`;
			default:
				return '';
		}
	}

	function oklchToRgb(l: number, c: number, h: number) {
		const a = c * Math.cos((h * Math.PI) / 180);
		const b = c * Math.sin((h * Math.PI) / 180);

		let lr = l + 0.3963377774 * a + 0.2158037573 * b;
		let lg = l - 0.1055613458 * a - 0.0638541728 * b;
		let lb = l - 0.0894841775 * a - 1.291485548 * b;

		lr = Math.max(0, Math.min(1, lr)) ** (1 / 2.2);
		lg = Math.max(0, Math.min(1, lg)) ** (1 / 2.2);
		lb = Math.max(0, Math.min(1, lb)) ** (1 / 2.2);

		return {
			r: Math.round(lr * 255),
			g: Math.round(lg * 255),
			b: Math.round(lb * 255),
		};
	}

	function getPatternStyles() {
		switch (backgroundPattern) {
			case 'noise':
				return "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E\")";
			case 'dots':
				return 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)';
			case 'grid':
				return 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)';
			default:
				return '';
		}
	}

	function getGradientOverlayStyles() {
		switch (gradientOverlay) {
			case 'subtle':
				return 'background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%);';
			case 'strong':
				return 'background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.1) 100%);';
			case 'radial':
				return 'background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 70%);';
			default:
				return '';
		}
	}

	function getBorderStyles() {
		if (!borderEnabled) return '';
		const rgba = hexToRgba(borderColor, borderOpacity);
		const boxShadow = borderGlow
			? `0 0 ${borderWidth * 4}px ${borderWidth}px ${rgba}, inset 0 1px 0 rgba(255,255,255,0.3)`
			: `inset 0 1px 0 rgba(255,255,255,0.2)`;
		return `border: ${borderWidth}px solid ${rgba}; box-shadow: ${boxShadow};`;
	}

	function hexToRgba(hex: string, alpha: number) {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div class="page-container">
	<div class="page-header">
		<div>
			<h1 class="page-title">Icon Creator</h1>
			<p class="page-description">
				Create beautiful macOS-style app icons with drag & drop, Tabler icons, and glass effects.
			</p>
		</div>
	</div>

	<div class="main-layout">
		<!-- Left: Preview Area -->
		<div class="preview-section">
			<div class="preview-wrapper">
				<div class="icon-container">
					<!-- Base Icon (Background + Glass) -->
					<div
						class="icon-base"
						style="
							background-color: {accentColor};
							background-image: {getPatternStyles()};
							background-size: {backgroundPattern === 'dots'
							? '20px 20px'
							: backgroundPattern === 'grid'
								? '30px 30px'
								: 'cover'};
							border-radius: {borderRadius}%;
							box-shadow: {shadowEnabled ? `0 20px 60px rgba(0,0,0,${shadowIntensity})` : 'none'};
							{getBorderStyles()}
						"
					>
						{#if backgroundGlassEffect !== 'none'}
							<div
								class="background-glass"
								style="border-radius: {borderRadius}%; {getGlassStyles(backgroundGlassEffect)}"
							></div>
						{/if}
						{#if gradientOverlay !== 'none'}
							<div
								class="gradient-overlay"
								style="border-radius: {borderRadius}%; {getGradientOverlayStyles()}"
							></div>
						{/if}
					</div>

					<!-- Icon Boundary Box (Visual Guide) -->
					<div class="icon-boundary" style="border-radius: {borderRadius}%;"></div>

					<!-- Export Area Boundary (Red Box) -->
					<div class="export-boundary"></div>

					<!-- Layers Container (Clipped) -->
					<div class="layers-clipped" style="border-radius: {borderRadius}%;">
						{#each layers.filter((l) => !l.overflow?.enabled) as layer (layer.id)}
							{@const IconComponent = layer.iconComponent}
							<div
								role="button"
								tabindex="0"
								class="layer"
								class:selected={selectedLayerId === layer.id}
								style="
									left: {layer.x}px;
									top: {layer.y}px;
									width: {layer.width}px;
									height: {layer.height}px;
									transform: translate(-50%, -50%) rotate({layer.rotation}deg);
									opacity: {layer.opacity};
									mix-blend-mode: {layer.blendMode || 'normal'};
								"
								onmousedown={(e) => handleMouseDown(e, layer.id, 'drag')}
								onkeydown={(e) => e.key === 'Delete' && removeLayer(layer.id)}
							>
								{#if layer.type === 'image' && layer.content}
									<img src={layer.content} alt="Layer" class="layer-content" />
									{#if layer.glassEffect && layer.glassEffect !== 'none'}
										<div class="glass-overlay" style={getGlassStyles(layer.glassEffect)}></div>
									{/if}
								{:else if layer.type === 'icon' && IconComponent}
									<div class="icon-layer" style="color: {layer.color || '#ffffff'};">
										<IconComponent size={layer.width * 0.8} />
									</div>
								{/if}

								{#if selectedLayerId === layer.id}
									<div class="selection-outline"></div>
									<button
										class="resize-handle"
										aria-label="Resize layer"
										onmousedown={(e) => handleMouseDown(e, layer.id, 'resize')}
									>
										<div class="resize-icon"></div>
									</button>
								{/if}
							</div>
						{/each}
					</div>

					<!-- Overflow Layers (Not Clipped) -->
					<div class="layers-overflow">
						{#each layers.filter((l) => l.overflow?.enabled) as layer (layer.id)}
							{@const IconComponent = layer.iconComponent}
							{@const layerCenterX = layer.x + 128}
							{@const layerCenterY = layer.y + 128}
							{@const layerLeft = layerCenterX - layer.width / 2}
							{@const layerTop = layerCenterY - layer.height / 2}
							{@const iconLeft = 128}
							{@const iconTop = 128}
							{@const iconRight = 640}
							{@const iconBottom = 640}
							{@const radius = (borderRadius / 100) * 512}
							{@const clipLeft = layer.overflow?.left ? 0 - layerLeft : iconLeft - layerLeft}
							{@const clipTop = layer.overflow?.top ? 0 - layerTop : iconTop - layerTop}
							{@const clipRight = layer.overflow?.right ? 768 - layerLeft : iconRight - layerLeft}
							{@const clipBottom = layer.overflow?.bottom ? 768 - layerTop : iconBottom - layerTop}
							{@const clipPath = `inset(${clipTop}px ${layer.width - clipRight}px ${layer.height - clipBottom}px ${clipLeft}px round ${radius}px)`}
							<div
								role="button"
								tabindex="0"
								class="layer overflow-layer"
								class:selected={selectedLayerId === layer.id}
								style="
									left: {layer.x + 128}px;
									top: {layer.y + 128}px;
									width: {layer.width}px;
									height: {layer.height}px;
									transform: translate(-50%, -50%) rotate({layer.rotation}deg);
									opacity: {layer.opacity};
									mix-blend-mode: {layer.blendMode || 'normal'};
									clip-path: {clipPath};
								"
								onmousedown={(e) => handleMouseDown(e, layer.id, 'drag')}
								onkeydown={(e) => e.key === 'Delete' && removeLayer(layer.id)}
							>
								{#if layer.type === 'image' && layer.content}
									<img src={layer.content} alt="Layer" class="layer-content" />
									{#if layer.glassEffect && layer.glassEffect !== 'none'}
										<div class="glass-overlay" style={getGlassStyles(layer.glassEffect)}></div>
									{/if}
								{:else if layer.type === 'icon' && IconComponent}
									<div class="icon-layer" style="color: {layer.color || '#ffffff'};">
										<IconComponent size={layer.width * 0.8} />
									</div>
								{/if}

								{#if selectedLayerId === layer.id}
									<div class="selection-outline"></div>
									<button
										class="resize-handle"
										aria-label="Resize layer"
										onmousedown={(e) => handleMouseDown(e, layer.id, 'resize')}
									>
										<div class="resize-icon"></div>
									</button>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<div class="preview-actions">
					<span class="preview-size">{iconSize}×{iconSize}px</span>
					<div class="action-buttons">
						<Button variant="primary" style="solid" onclick={downloadIcon}>
							<IconDownload size={18} />
							Download PNG
						</Button>
						<Button variant="neutral" style="outline" onclick={reset}>
							<IconRefresh size={18} />
						</Button>
					</div>
				</div>
			</div>
		</div>

		<!-- Right: Sidebar -->
		<div class="sidebar">
			<div class="sidebar-content">
				<!-- Add Content -->
				<div class="control-section">
					<h3 class="section-title">Add Content</h3>
					<div class="button-grid">
						<input
							type="file"
							accept="image/*"
							onchange={handleImageUpload}
							class="hidden"
							id="image-upload"
						/>
						<Button
							variant="neutral"
							style="outline"
							class="w-full"
							onclick={() => document.getElementById('image-upload')?.click()}
						>
							<IconPhoto size={18} />
							Image
						</Button>

						<Button
							variant="neutral"
							style="outline"
							class="w-full"
							onclick={() => (showIconPicker = !showIconPicker)}
						>
							<IconSparkles size={18} />
							Icon
						</Button>
					</div>

					{#if showIconPicker}
						<div class="icon-picker">
							<div class="search-box">
								<IconSearch size={16} />
								<input
									type="text"
									placeholder="Search icons..."
									bind:value={iconSearchQuery}
									class="search-input"
								/>
							</div>
							<div class="icon-grid">
								{#each filteredIcons.slice(0, 24) as icon (icon.name)}
									{@const IconComponent = icon.component}
									<button
										class="icon-button"
										onclick={() => addIcon(icon.name, icon.component)}
										title={icon.name}
									>
										<IconComponent size={24} />
									</button>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<!-- Background Color -->
				<div class="control-section">
					<h3 class="section-title">Background Color</h3>
					<div class="color-display" style="background: {accentColor};">
						<button class="color-code" onclick={copyColorCode} title="Click to copy">
							{accentColor}
						</button>
					</div>

					<div class="paste-color">
						<input
							type="text"
							placeholder="Paste OKLCH, HEX..."
							bind:value={colorInput}
							class="color-input"
							onkeydown={(e) => e.key === 'Enter' && handleColorPaste()}
						/>
						<Button variant="primary" style="solid" size="sm" onclick={handleColorPaste}>
							<IconCheck size={16} />
						</Button>
					</div>

					<div class="slider-group">
						<label for="hue" class="slider-label">Hue: {accentHue}°</label>
						<input
							id="hue"
							type="range"
							min="0"
							max="360"
							bind:value={accentHue}
							class="range-slider"
							style="--slider-color: {accentColor};"
						/>
					</div>

					<div class="slider-group">
						<label for="sat" class="slider-label"
							>Saturation: {(accentSaturation * 100).toFixed(0)}%</label
						>
						<input
							id="sat"
							type="range"
							min="0"
							max="0.4"
							step="0.01"
							bind:value={accentSaturation}
							class="range-slider"
							style="--slider-color: {accentColor};"
						/>
					</div>

					<div class="slider-group">
						<label for="light" class="slider-label"
							>Lightness: {(accentLightness * 100).toFixed(0)}%</label
						>
						<input
							id="light"
							type="range"
							min="0.3"
							max="0.9"
							step="0.01"
							bind:value={accentLightness}
							class="range-slider"
							style="--slider-color: {accentColor};"
						/>
					</div>
				</div>

				<!-- Style Settings -->
				<div class="control-section">
					<h3 class="section-title">Style</h3>

					<div class="slider-group">
						<label for="radius" class="slider-label">Border Radius: {borderRadius}%</label>
						<input
							id="radius"
							type="range"
							min="0"
							max="50"
							bind:value={borderRadius}
							class="range-slider"
							style="--slider-color: {accentColor};"
						/>
					</div>

					<div class="slider-group">
						<label for="pattern" class="slider-label">Background Pattern</label>
						<select id="pattern" bind:value={backgroundPattern} class="select-input">
							<option value="none">None</option>
							<option value="noise">Noise</option>
							<option value="dots">Dots</option>
							<option value="grid">Grid</option>
						</select>
					</div>

					<div class="slider-group">
						<label for="glass" class="slider-label">Background Glass</label>
						<select id="glass" bind:value={backgroundGlassEffect} class="select-input">
							<option value="none">None</option>
							<option value="light">Light</option>
							<option value="strong">Strong</option>
							<option value="bento">Bento Style</option>
						</select>
					</div>

					{#if backgroundGlassEffect !== 'none'}
						<div class="slider-group">
							<label for="glass-intensity" class="slider-label"
								>Glass Intensity: {(glassOpacity * 100).toFixed(0)}%</label
							>
							<input
								id="glass-intensity"
								type="range"
								min="0"
								max="0.5"
								step="0.01"
								bind:value={glassOpacity}
								class="range-slider"
								style="--slider-color: {accentColor};"
							/>
						</div>
					{/if}

					<div class="slider-group">
						<label for="size" class="slider-label">Export Size</label>
						<select id="size" bind:value={iconSize} class="select-input">
							<option value={256}>256×256px</option>
							<option value={512}>512×512px</option>
							<option value={1024}>1024×1024px</option>
							<option value={2048}>2048×2048px</option>
						</select>
					</div>

					<div class="slider-group">
						<label for="gradient" class="slider-label">Gradient Overlay</label>
						<select id="gradient" bind:value={gradientOverlay} class="select-input">
							<option value="none">None</option>
							<option value="subtle">Subtle</option>
							<option value="strong">Strong</option>
							<option value="radial">Radial</option>
						</select>
					</div>
				</div>

				<!-- Border & Shadow -->
				<div class="control-section">
					<h3 class="section-title">Border & Shadow</h3>

					<div class="slider-group">
						<label class="checkbox-label">
							<input type="checkbox" bind:checked={borderEnabled} class="checkbox-input" />
							Enable Border
						</label>
					</div>

					{#if borderEnabled}
						<div class="slider-group">
							<label for="border-width" class="slider-label">Border Width: {borderWidth}px</label>
							<input
								id="border-width"
								type="range"
								min="1"
								max="8"
								bind:value={borderWidth}
								class="range-slider"
								style="--slider-color: {borderColor};"
							/>
						</div>

						<div class="slider-group">
							<label for="border-color" class="slider-label">Border Color</label>
							<input id="border-color" type="color" bind:value={borderColor} class="color-picker" />
						</div>

						<div class="slider-group">
							<label for="border-opacity" class="slider-label"
								>Border Opacity: {(borderOpacity * 100).toFixed(0)}%</label
							>
							<input
								id="border-opacity"
								type="range"
								min="0"
								max="1"
								step="0.01"
								bind:value={borderOpacity}
								class="range-slider"
								style="--slider-color: {borderColor};"
							/>
						</div>

						<div class="slider-group">
							<label class="checkbox-label">
								<input type="checkbox" bind:checked={borderGlow} class="checkbox-input" />
								Border Glow Effect
							</label>
							<p class="help-text">Add light glow around border (like BentoItem glass)</p>
						</div>
					{/if}

					<div class="slider-group">
						<label class="checkbox-label">
							<input type="checkbox" bind:checked={shadowEnabled} class="checkbox-input" />
							Enable Shadow
						</label>
					</div>

					{#if shadowEnabled}
						<div class="slider-group">
							<label for="shadow-intensity" class="slider-label"
								>Shadow Intensity: {(shadowIntensity * 100).toFixed(0)}%</label
							>
							<input
								id="shadow-intensity"
								type="range"
								min="0"
								max="0.8"
								step="0.01"
								bind:value={shadowIntensity}
								class="range-slider"
								style="--slider-color: {accentColor};"
							/>
						</div>
					{/if}
				</div>

				<!-- Glass Accent -->
				{#if backgroundGlassEffect !== 'none'}
					<div class="control-section">
						<h3 class="section-title">Glass Highlight</h3>
						<p class="section-description">Customize glass overlay appearance</p>

						<div class="color-preview" style="background: {glassHighlightColorOklch};"></div>

						<div class="paste-group">
							<input
								type="text"
								placeholder="Paste OKLCH, HEX..."
								bind:value={glassColorInput}
								class="color-input"
								onkeydown={(e) => e.key === 'Enter' && handleGlassColorPaste()}
							/>
							<Button variant="primary" style="solid" size="sm" onclick={handleGlassColorPaste}>
								<IconCheck size={16} />
							</Button>
						</div>

						<div class="slider-group">
							<label for="glass-highlight-hue" class="slider-label">Hue: {glassHighlightHue}°</label
							>
							<input
								id="glass-highlight-hue"
								type="range"
								min="0"
								max="360"
								bind:value={glassHighlightHue}
								class="range-slider"
								style="--slider-color: {glassHighlightColorOklch};"
							/>
						</div>

						<div class="slider-group">
							<label for="glass-highlight-sat" class="slider-label"
								>Saturation: {(glassHighlightSaturation * 100).toFixed(0)}%</label
							>
							<input
								id="glass-highlight-sat"
								type="range"
								min="0"
								max="0.4"
								step="0.01"
								bind:value={glassHighlightSaturation}
								class="range-slider"
								style="--slider-color: {glassHighlightColorOklch};"
							/>
						</div>

						<div class="slider-group">
							<label for="glass-highlight-light" class="slider-label"
								>Lightness: {(glassHighlightLightness * 100).toFixed(0)}%</label
							>
							<input
								id="glass-highlight-light"
								type="range"
								min="0"
								max="1"
								step="0.01"
								bind:value={glassHighlightLightness}
								class="range-slider"
								style="--slider-color: {glassHighlightColorOklch};"
							/>
						</div>

						<div class="slider-group">
							<label for="glass-highlight-opacity" class="slider-label"
								>Highlight Opacity: {(glassHighlightOpacity * 100).toFixed(0)}%</label
							>
							<input
								id="glass-highlight-opacity"
								type="range"
								min="0"
								max="1"
								step="0.01"
								bind:value={glassHighlightOpacity}
								class="range-slider"
								style="--slider-color: {glassHighlightColorOklch};"
							/>
						</div>

						<div class="slider-group">
							<label for="glass-hue" class="slider-label">Color Tint Hue: {glassAccentHue}°</label>
							<input
								id="glass-hue"
								type="range"
								min="0"
								max="360"
								bind:value={glassAccentHue}
								class="range-slider"
								style="--slider-color: {glassAccentColor};"
							/>
						</div>

						<div class="slider-group">
							<label for="glass-sat" class="slider-label"
								>Color Tint Saturation: {(glassAccentSaturation * 100).toFixed(0)}%</label
							>
							<input
								id="glass-sat"
								type="range"
								min="0"
								max="0.3"
								step="0.01"
								bind:value={glassAccentSaturation}
								class="range-slider"
								style="--slider-color: {glassAccentColor};"
							/>
						</div>

						{#if glassAccentSaturation > 0}
							<div class="accent-preview" style="background: {glassAccentColor};"></div>
						{/if}
					</div>
				{/if}

				<!-- Layer Controls -->
				{#if selectedLayer}
					<div class="control-section">
						<div class="section-header">
							<h3 class="section-title">Layer Properties</h3>
							<Button
								variant="danger"
								style="ghost"
								size="sm"
								onclick={() => selectedLayerId && removeLayer(selectedLayerId)}
							>
								<IconTrash size={16} />
							</Button>
						</div>

						<div class="slider-group">
							<label for="rotation" class="slider-label"
								>Rotation: {selectedLayer.rotation.toFixed(0)}°</label
							>
							<input
								id="rotation"
								type="range"
								min="0"
								max="360"
								value={selectedLayer.rotation}
								oninput={(e) =>
									selectedLayerId &&
									updateLayer(selectedLayerId, { rotation: Number(e.currentTarget.value) })}
								class="range-slider"
								style="--slider-color: {accentColor};"
							/>
						</div>

						<div class="slider-group">
							<label for="opacity" class="slider-label"
								>Opacity: {(selectedLayer.opacity * 100).toFixed(0)}%</label
							>
							<input
								id="opacity"
								type="range"
								min="0"
								max="1"
								step="0.01"
								value={selectedLayer.opacity}
								oninput={(e) =>
									selectedLayerId &&
									updateLayer(selectedLayerId, { opacity: Number(e.currentTarget.value) })}
								class="range-slider"
								style="--slider-color: {accentColor};"
							/>
						</div>

						{#if selectedLayer.type === 'image'}
							<div class="slider-group">
								<label for="layer-glass" class="slider-label">Glass Effect</label>
								<select
									id="layer-glass"
									value={selectedLayer.glassEffect}
									onchange={(e) =>
										selectedLayerId &&
										updateLayer(selectedLayerId, {
											glassEffect: e.currentTarget.value as 'none' | 'light' | 'strong' | 'bento',
										})}
									class="select-input"
								>
									<option value="none">None</option>
									<option value="light">Light</option>
									<option value="strong">Strong</option>
									<option value="bento">Bento Style</option>
								</select>
								<p class="help-text">Glass overlay on top of image</p>
							</div>
						{/if}

						<div class="slider-group">
							<label for="blend" class="slider-label">Blend Mode</label>
							<select
								id="blend"
								value={selectedLayer.blendMode}
								onchange={(e) =>
									selectedLayerId &&
									updateLayer(selectedLayerId, {
										blendMode: e.currentTarget.value as
											| 'normal'
											| 'multiply'
											| 'screen'
											| 'overlay',
									})}
								class="select-input"
							>
								<option value="normal">Normal</option>
								<option value="multiply">Multiply</option>
								<option value="screen">Screen</option>
								<option value="overlay">Overlay</option>
							</select>
						</div>

						{#if selectedLayer.type === 'icon'}
							<div class="slider-group">
								<label for="icon-color" class="slider-label">Icon Color</label>
								<input
									id="icon-color"
									type="color"
									value={selectedLayer.color}
									oninput={(e) =>
										selectedLayerId &&
										updateLayer(selectedLayerId, { color: e.currentTarget.value })}
									class="color-picker"
								/>
							</div>
						{/if}

						<div class="slider-group">
							<label class="checkbox-label">
								<input
									type="checkbox"
									checked={selectedLayer.overflow?.enabled || false}
									onchange={(e) =>
										selectedLayerId &&
										updateLayer(selectedLayerId, {
											overflow: {
												...(selectedLayer.overflow || {
													top: false,
													right: false,
													bottom: false,
													left: false,
												}),
												enabled: e.currentTarget.checked,
											},
										})}
									class="checkbox-input"
								/>
								Allow Overflow
							</label>
							<p class="help-text">Let layer break out of icon boundaries</p>
						</div>

						{#if selectedLayer.overflow?.enabled}
							<div class="overflow-controls">
								<p class="overflow-title">Overflow Directions:</p>
								<div class="overflow-grid">
									<label class="overflow-option">
										<input
											type="checkbox"
											checked={selectedLayer.overflow?.top || false}
											onchange={(e) =>
												selectedLayerId &&
												updateLayer(selectedLayerId, {
													overflow: {
														...(selectedLayer.overflow || {
															enabled: true,
															top: false,
															right: false,
															bottom: false,
															left: false,
														}),
														top: e.currentTarget.checked,
													},
												})}
											class="checkbox-input"
										/>
										Top
									</label>
									<label class="overflow-option">
										<input
											type="checkbox"
											checked={selectedLayer.overflow?.right || false}
											onchange={(e) =>
												selectedLayerId &&
												selectedLayer &&
												updateLayer(selectedLayerId, {
													overflow: {
														...(selectedLayer.overflow || {
															enabled: true,
															top: false,
															right: false,
															bottom: false,
															left: false,
														}),
														right: e.currentTarget.checked,
													},
												})}
											class="checkbox-input"
										/>
										<span>Right</span>
									</label>
									<label class="overflow-option">
										<input
											type="checkbox"
											checked={selectedLayer.overflow?.bottom || false}
											onchange={(e) =>
												selectedLayerId &&
												selectedLayer &&
												updateLayer(selectedLayerId, {
													overflow: {
														...(selectedLayer.overflow || {
															enabled: true,
															top: false,
															right: false,
															bottom: false,
															left: false,
														}),
														bottom: e.currentTarget.checked,
													},
												})}
											class="checkbox-input"
										/>
										<span>Bottom</span>
									</label>
									<label class="overflow-option">
										<input
											type="checkbox"
											checked={selectedLayer.overflow?.left || false}
											onchange={(e) =>
												selectedLayerId &&
												selectedLayer &&
												updateLayer(selectedLayerId, {
													overflow: {
														...(selectedLayer.overflow || {
															enabled: true,
															top: false,
															right: false,
															bottom: false,
															left: false,
														}),
														left: e.currentTarget.checked,
													},
												})}
											class="checkbox-input"
										/>
										<span>Left</span>
									</label>
								</div>
							</div>
						{/if}
					</div>
				{/if}

				<!-- Layers List -->
				{#if layers.length > 0}
					<div class="control-section">
						<h3 class="section-title">Layers ({layers.length})</h3>
						<div class="layers-list">
							{#each layers as layer (layer.id)}
								{@const IconComponent = layer.iconComponent}
								<div
									class="layer-item"
									class:active={selectedLayerId === layer.id}
									role="button"
									tabindex="0"
									onclick={() => selectLayer(layer.id)}
									onkeydown={(e) => e.key === 'Enter' && selectLayer(layer.id)}
								>
									<div class="layer-thumbnail">
										{#if layer.type === 'image' && layer.content}
											<img src={layer.content} alt="" />
										{:else if layer.type === 'icon' && IconComponent}
											<IconComponent size={20} />
										{/if}
									</div>
									<span class="layer-name">{layer.type === 'icon' ? layer.content : 'Image'}</span>
									<button
										class="layer-delete"
										onclick={(evt) => {
											evt.stopPropagation();
											removeLayer(layer.id);
										}}
									>
										<IconX size={14} />
									</button>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.page-container {
		max-width: 1600px;
		margin: 0 auto;
		padding: 2rem;
	}

	.page-header {
		margin-bottom: 2rem;
	}

	.page-title {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: var(--waku-fg);
	}

	.page-description {
		color: var(--waku-fg-muted);
		font-size: 1rem;
	}

	.main-layout {
		display: grid;
		grid-template-columns: 1fr 380px;
		gap: 2rem;
		align-items: start;
	}

	.preview-section {
		position: sticky;
		top: 2rem;
	}

	.preview-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 2rem;
		background: var(--waku-surface-1);
		border: 1px solid var(--waku-border);
		border-radius: 1rem;
	}

	.icon-container {
		position: relative;
		width: 768px;
		height: 768px;
		margin: 0 auto;
		overflow: visible;
	}

	.icon-base {
		position: absolute;
		top: 128px;
		left: 128px;
		width: 512px;
		height: 512px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		pointer-events: none;
		z-index: 0;
	}

	.icon-boundary {
		position: absolute;
		top: 128px;
		left: 128px;
		width: 512px;
		height: 512px;
		border: 2px dashed rgba(255, 255, 255, 0.3);
		pointer-events: none;
		z-index: 1000;
	}

	.export-boundary {
		position: absolute;
		inset: 0;
		border: 3px solid rgba(255, 0, 0, 0.6);
		pointer-events: none;
		z-index: 1001;
	}

	.layers-clipped {
		position: absolute;
		top: 128px;
		left: 128px;
		width: 512px;
		height: 512px;
		overflow: hidden;
		pointer-events: none;
	}

	.layers-overflow {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 10;
		overflow: visible;
	}

	.layer {
		position: absolute;
		cursor: move;
		border: 2px solid transparent;
		transition: border-color 0.2s;
		pointer-events: all;
	}

	.layer.selected {
		border-color: rgba(255, 255, 255, 0.5);
	}

	.overflow-layer {
		z-index: 100;
	}

	.layer-content {
		width: 100%;
		height: 100%;
		object-fit: contain;
		pointer-events: none;
	}

	.icon-layer {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.glass-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.selection-outline {
		position: absolute;
		inset: -2px;
		border: 2px dashed rgba(255, 255, 255, 0.8);
		border-radius: 4px;
		pointer-events: none;
	}

	.resize-handle {
		position: absolute;
		bottom: -8px;
		right: -8px;
		width: 16px;
		height: 16px;
		background: white;
		border: 2px solid var(--accent-500, #8b5cf6);
		border-radius: 50%;
		cursor: nwse-resize;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.resize-icon {
		width: 6px;
		height: 6px;
		background: var(--accent-500, #8b5cf6);
		border-radius: 50%;
	}

	.background-glass {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 1;
		overflow: hidden;
	}

	.gradient-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 2;
		overflow: hidden;
	}

	.preview-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.preview-size {
		font-size: 0.875rem;
		color: var(--waku-fg-muted);
		font-weight: 500;
	}

	.action-buttons {
		display: flex;
		gap: 0.75rem;
	}

	.sidebar {
		height: calc(100vh - 8rem);
		overflow-y: auto;
		overflow-x: hidden;
		padding: 1rem;
		background: var(--waku-surface-1);
		border: 1px solid var(--waku-border);
		border-radius: 1rem;
		scrollbar-width: thin;
		scrollbar-color: var(--waku-border) transparent;
	}

	.sidebar::-webkit-scrollbar {
		width: 6px;
	}

	.sidebar::-webkit-scrollbar-track {
		background: transparent;
	}

	.sidebar::-webkit-scrollbar-thumb {
		background: var(--waku-border);
		border-radius: 3px;
	}

	.sidebar::-webkit-scrollbar-thumb:hover {
		background: var(--waku-fg-muted);
	}

	.sidebar-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.control-section {
		padding: 1rem;
		background: var(--waku-surface-2);
		border: 1px solid var(--waku-border);
		border-radius: 0.75rem;
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.section-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--waku-fg);
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.section-description {
		font-size: 0.75rem;
		color: var(--waku-fg-muted);
		margin-bottom: 0.75rem;
	}

	.button-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.hidden {
		display: none;
	}

	.icon-picker {
		margin-top: 0.75rem;
		padding: 0.75rem;
		background: var(--waku-surface-1);
		border-radius: 0.5rem;
		max-height: 300px;
		overflow-y: auto;
	}

	.search-box {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		background: var(--waku-surface-2);
		border-radius: 0.375rem;
		margin-bottom: 0.75rem;
		border: 1px solid var(--waku-border);
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: var(--waku-fg);
		font-size: 0.875rem;
	}

	.icon-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 0.5rem;
	}

	.icon-button {
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		background: var(--waku-surface-2);
		border: 1px solid var(--waku-border);
		border-radius: 0.375rem;
		cursor: pointer;
		transition: all 0.2s;
		color: var(--waku-fg);
	}

	.icon-button:hover {
		background: var(--waku-surface-1);
		border-color: var(--accent-500);
		transform: scale(1.05);
	}

	.color-display {
		height: 60px;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transition: all 0.3s;
		margin-bottom: 0.75rem;
	}

	.color-code {
		padding: 0.5rem 1rem;
		background: rgba(0, 0, 0, 0.3);
		color: white;
		border-radius: 0.375rem;
		font-family: monospace;
		font-size: 0.875rem;
		border: none;
		cursor: pointer;
		transition: all 0.2s;
	}

	.color-code:hover {
		background: rgba(0, 0, 0, 0.5);
	}

	.paste-color {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.color-input {
		flex: 1;
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid var(--waku-border);
		background: var(--waku-surface-1);
		color: var(--waku-fg);
		font-size: 0.875rem;
	}

	.slider-group {
		margin-bottom: 0.75rem;
	}

	.slider-group:last-child {
		margin-bottom: 0;
	}

	.slider-label {
		display: block;
		font-size: 0.75rem;
		color: var(--waku-fg-muted);
		margin-bottom: 0.375rem;
	}

	.range-slider {
		width: 100%;
		height: 6px;
		border-radius: 3px;
		background: var(--waku-surface-1);
		outline: none;
		-webkit-appearance: none;
		appearance: none;
		accent-color: var(--slider-color);
	}

	.range-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--slider-color);
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.range-slider::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--slider-color);
		cursor: pointer;
		border: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.select-input {
		width: 100%;
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid var(--waku-border);
		background: var(--waku-surface-1);
		color: var(--waku-fg);
		font-size: 0.875rem;
	}

	.color-picker {
		width: 100%;
		height: 40px;
		padding: 0.25rem;
		border-radius: 0.5rem;
		border: 1px solid var(--waku-border);
		background: var(--waku-surface-1);
		cursor: pointer;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: var(--waku-fg);
		cursor: pointer;
	}

	.checkbox-input {
		width: 16px;
		height: 16px;
		cursor: pointer;
		accent-color: var(--accent-500);
	}

	.help-text {
		font-size: 0.75rem;
		color: var(--waku-fg-muted);
		margin-top: 0.25rem;
	}

	.accent-preview {
		height: 32px;
		border-radius: 0.5rem;
		margin-top: 0.5rem;
	}

	.overflow-controls {
		padding: 0.75rem;
		background: var(--waku-surface-1);
		border-radius: 0.5rem;
		border: 1px solid var(--waku-border);
		margin-top: 0.5rem;
	}

	.overflow-title {
		font-size: 0.75rem;
		color: var(--waku-fg-muted);
		margin-bottom: 0.5rem;
	}

	.overflow-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.overflow-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		background: var(--waku-surface-2);
		border-radius: 0.375rem;
		cursor: pointer;
		font-size: 0.875rem;
		transition: all 0.2s;
	}

	.overflow-option:hover {
		background: var(--waku-surface-1);
	}

	.layers-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-height: 200px;
		overflow-y: auto;
	}

	.layer-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem;
		background: var(--waku-surface-1);
		border: 1px solid var(--waku-border);
		border-radius: 0.375rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.layer-item:hover {
		background: var(--waku-surface-2);
	}

	.layer-item.active {
		border-color: var(--accent-500);
		background: var(--waku-surface-2);
	}

	.layer-thumbnail {
		width: 32px;
		height: 32px;
		border-radius: 0.25rem;
		background: var(--waku-surface-2);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		flex-shrink: 0;
	}

	.layer-thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.layer-name {
		flex: 1;
		font-size: 0.875rem;
		color: var(--waku-fg);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.layer-delete {
		padding: 0.25rem;
		background: transparent;
		border: none;
		color: var(--waku-fg-muted);
		cursor: pointer;
		border-radius: 0.25rem;
		transition: all 0.2s;
	}

	.layer-delete:hover {
		background: var(--waku-surface-2);
		color: var(--danger-500);
	}

	@media (max-width: 1200px) {
		.main-layout {
			grid-template-columns: 1fr;
		}

		.preview-section {
			position: static;
		}

		.sidebar {
			height: auto;
			max-height: 600px;
		}
	}
</style>
