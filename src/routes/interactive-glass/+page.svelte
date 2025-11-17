<script lang="ts">
	import { VStack, HStack, Card } from '$lib/layout';
	import { Button } from '$lib/components';
	import { interactiveGlass, premiumGlass, cursorGlow, scrollGlass } from '$lib/actions';

	let scrollY = $state(0);
	let isDark = $state(false);

	function toggleDarkMode() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
	}
</script>

<svelte:window bind:scrollY />

<VStack gap="2xl" class="min-h-screen p-8 bg-surface-0">
	<!-- Header -->
	<VStack gap="md" class="max-w-4xl mx-auto w-full">
		<HStack justify="between" align="center">
			<div>
				<h1 class="text-4xl font-bold text-base">Interactive Glass Effects</h1>
				<p class="text-muted mt-2">
					Liquid glass with dynamic highlights, speckles, and reactive lighting
				</p>
			</div>
			<Button variant="outline" onclick={toggleDarkMode}>
				{isDark ? '☀️ Light' : '🌙 Dark'}
			</Button>
		</HStack>

		<div class="bg-accent/10 border border-accent/20 rounded-lg p-4">
			<p class="text-sm text-muted">
				<strong>Try this:</strong> Hover over the glass cards below and move your cursor around. Scroll
				the page to see the highlights shift. The speckles float continuously.
			</p>
		</div>
	</VStack>

	<!-- Main Demo Section -->
	<VStack gap="2xl" class="max-w-6xl mx-auto w-full">
		<!-- Premium Glass (Full Features) -->
		<VStack gap="md">
			<h2 class="text-2xl font-semibold text-base">Premium Glass (All Features)</h2>
			<p class="text-muted">
				Cursor tracking, scroll animation, floating speckles, and hover glow
			</p>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div
					use:premiumGlass
					class="glass p-8 min-h-[300px] flex flex-col justify-center"
				>
					<h3 class="text-xl font-semibold text-base mb-3">Interactive Card</h3>
					<p class="text-muted mb-4">
						This card responds to your cursor position, creating a dynamic glow effect. The edge
						highlights shift as you scroll, and subtle light speckles float across the surface.
					</p>
					<Button variant="primary">Explore</Button>
				</div>

				<div
					use:premiumGlass
					class="glass-heavy p-8 min-h-[300px] flex flex-col justify-center"
				>
					<h3 class="text-xl font-semibold text-base mb-3">Heavy Glass Variant</h3>
					<p class="text-muted mb-4">
						Thicker blur with mesh gradient overlay. Perfect for modals and primary content areas.
						Watch the specular highlights rotate as you scroll.
					</p>
					<Button variant="subtle">Learn More</Button>
				</div>
			</div>
		</VStack>

		<!-- Glass Variants Comparison -->
		<VStack gap="md">
			<h2 class="text-2xl font-semibold text-base">Glass Thickness Variants</h2>
			<p class="text-muted">Different blur intensities for different use cases</p>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<!-- Ultra Thin -->
				<div use:interactiveGlass class="glass-ultra-thin p-6">
					<div class="text-xs font-mono text-accent mb-2">Ultra Thin (20px blur)</div>
					<h4 class="text-lg font-semibold text-base mb-2">Toolbars</h4>
					<p class="text-sm text-muted">Minimal blur for menu bars and status bars</p>
				</div>

				<!-- Thin -->
				<div use:interactiveGlass class="glass-thin p-6">
					<div class="text-xs font-mono text-accent mb-2">Thin (30px blur)</div>
					<h4 class="text-lg font-semibold text-base mb-2">Dropdowns</h4>
					<p class="text-sm text-muted">Light glass for popovers and menus</p>
				</div>

				<!-- Thick -->
				<div use:interactiveGlass class="glass-thick p-6">
					<div class="text-xs font-mono text-accent mb-2">Thick (80px blur)</div>
					<h4 class="text-lg font-semibold text-base mb-2">Modals</h4>
					<p class="text-sm text-muted">Heavy blur with mesh gradients</p>
				</div>
			</div>
		</VStack>

		<!-- Specialized Effects -->
		<VStack gap="md">
			<h2 class="text-2xl font-semibold text-base">Specialized Effects</h2>
			<p class="text-muted">Cursor-only glow and scroll-reactive glass</p>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Cursor Glow Only -->
				<div use:cursorGlow class="glass p-8 min-h-[250px] flex flex-col justify-center">
					<div class="text-xs font-mono text-accent mb-3">use:cursorGlow</div>
					<h3 class="text-xl font-semibold text-base mb-3">Cursor Glow</h3>
					<p class="text-muted">
						Only cursor tracking enabled. Move your mouse over this card to see the glow follow
						your cursor.
					</p>
				</div>

				<!-- Scroll Reactive Only -->
				<div use:scrollGlass class="glass p-8 min-h-[250px] flex flex-col justify-center">
					<div class="text-xs font-mono text-accent mb-3">use:scrollGlass</div>
					<h3 class="text-xl font-semibold text-base mb-3">Scroll Reactive</h3>
					<p class="text-muted">
						Only scroll animation enabled. The specular highlights rotate as you scroll the page.
					</p>
				</div>
			</div>
		</VStack>

		<!-- Tinted Glass (Accent Color) -->
		<VStack gap="md">
			<h2 class="text-2xl font-semibold text-base">Tinted Glass</h2>
			<p class="text-muted">Glass with accent color tinting</p>

			<div
				use:interactiveGlass
				class="glass-tinted p-10 text-center min-h-[300px] flex flex-col justify-center"
			>
				<h3 class="text-2xl font-bold text-base mb-3">Accent Tinted Glass</h3>
				<p class="text-muted mb-6 max-w-lg mx-auto">
					This glass variant is tinted with your accent color. Perfect for highlighting special
					content or call-to-action sections. The glow effect uses the accent color too.
				</p>
				<div class="flex gap-3 justify-center">
					<Button variant="primary">Primary Action</Button>
					<Button variant="outline">Secondary</Button>
				</div>
			</div>
		</VStack>

		<!-- Usage Examples -->
		<VStack gap="md">
			<h2 class="text-2xl font-semibold text-base">How to Use</h2>

			<Card padding="lg">
				<VStack gap="lg">
					<div>
						<h3 class="text-lg font-semibold text-base mb-3">1. Import the action</h3>
						<pre class="bg-neutral-900 text-neutral-50 p-4 rounded-lg overflow-x-auto text-sm"><code
							>{`import { interactiveGlass, premiumGlass, cursorGlow } from 'waku/actions';`}</code
							></pre>
					</div>

					<div>
						<h3 class="text-lg font-semibold text-base mb-3">2. Apply to glass elements</h3>
						<pre class="bg-neutral-900 text-neutral-50 p-4 rounded-lg overflow-x-auto text-sm"><code
							>{`<!-- Full-featured interactive glass -->
<div use:premiumGlass class="glass">
  Your content here
</div>

<!-- Cursor glow only -->
<div use:cursorGlow class="glass-heavy">
  Modal content
</div>

<!-- Custom options -->
<div use:interactiveGlass={{ intensity: 1.5, speed: 0.2 }} class="glass-thick">
  Customized glass
</div>`}</code
							></pre>
					</div>

					<div>
						<h3 class="text-lg font-semibold text-base mb-3">3. Available glass classes</h3>
						<div class="grid grid-cols-2 md:grid-cols-3 gap-2">
							{#each ['glass', 'glass-heavy', 'glass-subtle', 'glass-ultra-thin', 'glass-thin', 'glass-thick', 'glass-tinted'] as glassClass}
								<code class="bg-accent/10 text-accent px-3 py-2 rounded text-sm"
									>.{glassClass}</code
								>
							{/each}
						</div>
					</div>

					<div>
						<h3 class="text-lg font-semibold text-base mb-3">4. Action options</h3>
						<div class="space-y-2 text-sm">
							<div class="flex gap-3">
								<code class="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-xs"
									>enableCursor</code
								>
								<span class="text-muted">Track cursor for glow effect (default: true)</span>
							</div>
							<div class="flex gap-3">
								<code class="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-xs"
									>enableScroll</code
								>
								<span class="text-muted">Animate highlights on scroll (default: true)</span>
							</div>
							<div class="flex gap-3">
								<code class="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-xs"
									>enableSpeckles</code
								>
								<span class="text-muted">Show floating light particles (default: true)</span>
							</div>
							<div class="flex gap-3">
								<code class="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-xs"
									>intensity</code
								>
								<span class="text-muted">Effect strength multiplier 0-2 (default: 1)</span>
							</div>
							<div class="flex gap-3">
								<code class="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-xs"
									>speed</code
								>
								<span class="text-muted">Highlight movement speed 0-1 (default: 0.15)</span>
							</div>
						</div>
					</div>
				</VStack>
			</Card>
		</VStack>

		<!-- Scroll Indicator -->
		<div class="sticky bottom-8 left-0 right-0 flex justify-center pointer-events-none">
			<div class="glass-subtle px-6 py-3 rounded-full backdrop-blur-xl">
				<div class="text-sm text-muted">
					Scroll Position: <span class="text-accent font-mono">{Math.round(scrollY)}px</span>
				</div>
			</div>
		</div>

		<!-- Spacer for scrolling -->
		<div class="h-96"></div>
	</VStack>
</VStack>

<style>
	/* Ensure background has enough content to show glass effect */
	:global(body) {
		background: linear-gradient(
				135deg,
				oklch(from var(--waku-accent) calc(l + 0.35) calc(c * 0.2) h / 0.05) 0%,
				transparent 50%
			),
			linear-gradient(
				225deg,
				oklch(from var(--waku-accent) calc(l + 0.3) calc(c * 0.15) calc(h + 120) / 0.05) 0%,
				transparent 50%
			),
			var(--waku-surface-0);
		background-attachment: fixed;
	}

	/* Grid utilities */
	.grid {
		display: grid;
	}

	.grid-cols-1 {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}

	.grid-cols-2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.grid-cols-3 {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	@media (min-width: 768px) {
		.md\:grid-cols-2 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.md\:grid-cols-3 {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.gap-2 {
		gap: 0.5rem;
	}

	.gap-3 {
		gap: 0.75rem;
	}

	.gap-4 {
		gap: 1rem;
	}

	.gap-6 {
		gap: 1.5rem;
	}

	.space-y-2 > * + * {
		margin-top: 0.5rem;
	}

	/* Utility classes */
	.min-h-screen {
		min-height: 100vh;
	}

	.min-h-\[250px\] {
		min-height: 250px;
	}

	.min-h-\[300px\] {
		min-height: 300px;
	}

	.h-96 {
		height: 24rem;
	}

	.max-w-4xl {
		max-width: 56rem;
	}

	.max-w-6xl {
		max-width: 72rem;
	}

	.max-w-lg {
		max-width: 32rem;
	}

	.mx-auto {
		margin-left: auto;
		margin-right: auto;
	}

	.w-full {
		width: 100%;
	}

	.p-4 {
		padding: 1rem;
	}

	.p-6 {
		padding: 1.5rem;
	}

	.p-8 {
		padding: 2rem;
	}

	.p-10 {
		padding: 2.5rem;
	}

	.px-2 {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}

	.px-3 {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
	}

	.px-6 {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}

	.py-1 {
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}

	.py-2 {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	.py-3 {
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
	}

	.mt-2 {
		margin-top: 0.5rem;
	}

	.mb-2 {
		margin-top: 0.5rem;
	}

	.mb-3 {
		margin-bottom: 0.75rem;
	}

	.mb-4 {
		margin-bottom: 1rem;
	}

	.mb-6 {
		margin-bottom: 1.5rem;
	}

	.text-xs {
		font-size: 0.75rem;
		line-height: 1rem;
	}

	.text-sm {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.text-lg {
		font-size: 1.125rem;
		line-height: 1.75rem;
	}

	.text-xl {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}

	.text-2xl {
		font-size: 1.5rem;
		line-height: 2rem;
	}

	.text-4xl {
		font-size: 2.25rem;
		line-height: 2.5rem;
	}

	.font-mono {
		font-family: ui-monospace, monospace;
	}

	.font-semibold {
		font-weight: 600;
	}

	.font-bold {
		font-weight: 700;
	}

	.text-center {
		text-align: center;
	}

	.flex {
		display: flex;
	}

	.flex-col {
		flex-direction: column;
	}

	.justify-center {
		justify-content: center;
	}

	.justify-between {
		justify-content: space-between;
	}

	.align-center {
		align-items: center;
	}

	.rounded {
		border-radius: 0.375rem;
	}

	.rounded-lg {
		border-radius: var(--radius-lg);
	}

	.rounded-full {
		border-radius: 9999px;
	}

	.border {
		border-width: 1px;
	}

	.border-accent\/20 {
		border-color: oklch(from var(--waku-accent) l c h / 0.2);
	}

	.bg-accent\/10 {
		background-color: oklch(from var(--waku-accent) l c h / 0.1);
	}

	.bg-surface-0 {
		background-color: var(--waku-surface-0);
	}

	.bg-neutral-100 {
		background-color: var(--neutral-100);
	}

	.bg-neutral-900 {
		background-color: var(--neutral-900);
	}

	.text-neutral-50 {
		color: var(--neutral-50);
	}

	.overflow-x-auto {
		overflow-x: auto;
	}

	.sticky {
		position: sticky;
	}

	.bottom-8 {
		bottom: 2rem;
	}

	.pointer-events-none {
		pointer-events: none;
	}

	.backdrop-blur-xl {
		backdrop-filter: blur(24px);
	}

	:global(.dark) .bg-neutral-100 {
		background-color: var(--neutral-800);
	}

	:global(.dark) .dark\:bg-neutral-800 {
		background-color: var(--neutral-800);
	}
</style>
