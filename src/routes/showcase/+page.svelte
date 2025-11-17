<script lang="ts">
	import {
		ThemeProvider,
		DepthContext,
		Button,
		Modal,
		toast,
		Toast
	} from '$lib/components';
	import { VStack, HStack, Card } from '$lib/layout';

	let modalOpen = $state(false);
	let accentColor = $state('oklch(0.65 0.2 250)'); // Default blue
	let isDark = $state(false);

	const accentPresets = [
		{ name: 'Blue', color: 'oklch(0.65 0.2 250)' },
		{ name: 'Purple', color: 'oklch(0.65 0.2 300)' },
		{ name: 'Pink', color: 'oklch(0.65 0.2 350)' },
		{ name: 'Red', color: 'oklch(0.6 0.22 25)' },
		{ name: 'Orange', color: 'oklch(0.68 0.2 50)' },
		{ name: 'Green', color: 'oklch(0.65 0.2 145)' },
		{ name: 'Teal', color: 'oklch(0.65 0.18 180)' },
		{ name: 'Cyan', color: 'oklch(0.70 0.15 210)' }
	];

	function toggleDarkMode() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
	}

	function showToast(type: 'info' | 'success' | 'warning' | 'error') {
		toast({
			title: `${type.charAt(0).toUpperCase() + type.slice(1)} notification`,
			description: 'This toast has interactive glass effects!',
			type,
			timeout: 4000
		});
	}
</script>

<ThemeProvider accent={accentColor} interactiveGlass={true}>
	<VStack gap="2xl" class="min-h-screen p-8 bg-surface-0">
		<!-- Header -->
		<VStack gap="md" class="max-w-6xl mx-auto w-full">
			<HStack justify="between" align="center" class="w-full">
				<div>
					<h1 class="text-4xl font-bold text-base">Waku Component Showcase</h1>
					<p class="text-muted mt-2">
						Automatic depth awareness, interactive glass, and dynamic theming
					</p>
				</div>
				<Button variant="outline" onclick={toggleDarkMode}>
					{isDark ? '☀️ Light' : '🌙 Dark'}
				</Button>
			</HStack>

			<div class="info-banner">
				<p class="text-sm">
					<strong>✨ What's New:</strong> Components automatically detect their depth and apply the
					appropriate styling. No manual elevation props needed! Cards at depth 0-2 use solid
					backgrounds, depth 3+ use glass effects.
				</p>
			</div>
		</VStack>

		<!-- Accent Color Selector -->
		<DepthContext>
			<Card class="max-w-6xl mx-auto w-full">
				<VStack gap="lg">
					<div>
						<h2 class="text-2xl font-semibold text-base mb-2">Custom Accent Color</h2>
						<p class="text-muted">
							Choose an accent color - it propagates throughout the entire theme automatically
						</p>
					</div>

					<div class="color-grid">
						{#each accentPresets as preset}
							<button
								class="color-option {accentColor === preset.color ? 'active' : ''}"
								style="--preset-color: {preset.color}"
								onclick={() => (accentColor = preset.color)}
							>
								<div class="color-circle"></div>
								<span class="color-name">{preset.name}</span>
							</button>
						{/each}
					</div>

					<div class="flex gap-3 flex-wrap">
						<Button variant="primary">Primary Button</Button>
						<Button variant="subtle">Subtle Button</Button>
						<Button variant="outline">Outline Button</Button>
						<Button variant="ghost">Ghost Button</Button>
					</div>
				</VStack>
			</Card>
		</DepthContext>

		<!-- Depth Demonstration -->
		<VStack gap="md" class="max-w-6xl mx-auto w-full">
			<h2 class="text-2xl font-semibold text-base">Automatic Depth Awareness</h2>
			<p class="text-muted">
				Cards automatically style themselves based on their nesting depth. Watch as depth increases!
			</p>

			<!-- Depth 0 (implicit from ThemeProvider) -->
			<Card>
				<VStack gap="md">
					<div>
						<div class="depth-badge">Depth 0</div>
						<h3 class="text-xl font-semibold text-base">Base Level Card</h3>
						<p class="text-sm text-muted">Solid background, subtle shadow</p>
					</div>

					<!-- Depth 1 (auto-incremented by DepthContext) -->
					<DepthContext>
						<Card>
							<VStack gap="md">
								<div>
									<div class="depth-badge">Depth 1</div>
									<h4 class="text-lg font-semibold text-base">Nested Card</h4>
									<p class="text-sm text-muted">Slightly elevated background</p>
								</div>

								<!-- Depth 2 -->
								<DepthContext>
									<Card>
										<VStack gap="md">
											<div>
												<div class="depth-badge">Depth 2</div>
												<h5 class="text-base font-semibold text-base">Deeply Nested Card</h5>
												<p class="text-sm text-muted">Highest elevation with solid background</p>
											</div>

											<!-- Depth 3 - Glass starts! -->
											<DepthContext>
												<Card>
													<div>
														<div class="depth-badge glass-badge">Depth 3 🪟</div>
														<h6 class="text-sm font-semibold text-base">Glass Effect Enabled!</h6>
														<p class="text-xs text-muted">
															At depth 3+, cards automatically use glass with interactive effects
														</p>
													</div>
												</Card>
											</DepthContext>
										</VStack>
									</Card>
								</DepthContext>
							</VStack>
						</Card>
					</DepthContext>
				</VStack>
			</Card>
		</VStack>

		<!-- Interactive Elements -->
		<VStack gap="md" class="max-w-6xl mx-auto w-full">
			<h2 class="text-2xl font-semibold text-base">Interactive Components</h2>
			<p class="text-muted">Modal and Toast at depth 4-5 with premium glass effects</p>

			<HStack gap="md" class="flex-wrap">
				<Button variant="primary" onclick={() => (modalOpen = true)}>Open Modal (Depth 4)</Button>
				<Button variant="subtle" onclick={() => showToast('info')}>Show Info Toast</Button>
				<Button variant="outline" onclick={() => showToast('success')}>Show Success Toast</Button>
				<Button variant="ghost" onclick={() => showToast('warning')}>Show Warning</Button>
			</HStack>
		</VStack>

		<!-- Code Examples -->
		<VStack gap="md" class="max-w-6xl mx-auto w-full">
			<h2 class="text-2xl font-semibold text-base">Usage Examples</h2>

			<DepthContext>
				<Card>
					<VStack gap="lg">
						<div>
							<h3 class="text-lg font-semibold text-base mb-3">1. Wrap your app with ThemeProvider</h3>
							<pre
								class="code-block"><code>{`<script>
  import { ThemeProvider } from 'waku';
</script>

<ThemeProvider accent="oklch(0.65 0.2 250)">
  <YourApp />
</ThemeProvider>`}</code></pre>
						</div>

						<div>
							<h3 class="text-lg font-semibold text-base mb-3">
								2. Use DepthContext to increment depth
							</h3>
							<pre
								class="code-block"><code>{`<script>
  import { DepthContext, Card } from 'waku';
</script>

<Card>
  <!-- Depth 1 (auto from ThemeProvider) -->
  <DepthContext>
    <Card>
      <!-- Depth 2 (auto-incremented) -->
      <DepthContext>
        <Card>
          <!-- Depth 3 - Glass effect auto-enabled! -->
        </Card>
      </DepthContext>
    </Card>
  </DepthContext>
</Card>`}</code></pre>
						</div>

						<div>
							<h3 class="text-lg font-semibold text-base mb-3">3. Components auto-style themselves</h3>
							<pre
								class="code-block"><code>{`<!-- No elevation prop needed! -->
<Card>Content</Card>

<!-- At depth 0-2: Solid backgrounds
     At depth 3+: Glass effects with interactivity -->`}</code></pre>
						</div>

						<div>
							<h3 class="text-lg font-semibold text-base mb-3">4. Customize accent color dynamically</h3>
							<pre
								class="code-block"><code>{`<script>
  let accent = $state('oklch(0.65 0.2 250)');
</script>

<ThemeProvider accent={accent}>
  <!-- All components use this accent color -->
  <Button variant="primary">Uses accent</Button>

  <!-- Change it anytime -->
  <button onclick={() => accent = 'oklch(0.65 0.2 145)'}>
    Switch to Green
  </button>
</ThemeProvider>`}</code></pre>
						</div>
					</VStack>
				</Card>
			</DepthContext>
		</VStack>

		<!-- Benefits List -->
		<VStack gap="md" class="max-w-6xl mx-auto w-full">
			<h2 class="text-2xl font-semibold text-base">Key Benefits</h2>

			<div class="benefits-grid">
				<DepthContext>
					<Card class="benefit-card">
						<div class="benefit-icon">🎨</div>
						<h3 class="text-lg font-semibold text-base mb-2">Automatic Theming</h3>
						<p class="text-sm text-muted">
							Set one accent color, get a complete theme with proper contrast and accessibility
						</p>
					</Card>
				</DepthContext>

				<DepthContext>
					<Card class="benefit-card">
						<div class="benefit-icon">📏</div>
						<h3 class="text-lg font-semibold text-base mb-2">Depth Awareness</h3>
						<p class="text-sm text-muted">
							Components detect their depth and apply appropriate styling automatically
						</p>
					</Card>
				</DepthContext>

				<DepthContext>
					<Card class="benefit-card">
						<div class="benefit-icon">✨</div>
						<h3 class="text-lg font-semibold text-base mb-2">Interactive Glass</h3>
						<p class="text-sm text-muted">
							Reactive highlights, speckles, and edge lighting that respond to cursor and scroll
						</p>
					</Card>
				</DepthContext>

				<DepthContext>
					<Card class="benefit-card">
						<div class="benefit-icon">⚡</div>
						<h3 class="text-lg font-semibold text-base mb-2">Performance</h3>
						<p class="text-sm text-muted">
							GPU-accelerated effects at 60fps with automatic cleanup and reduced motion support
						</p>
					</Card>
				</DepthContext>

				<DepthContext>
					<Card class="benefit-card">
						<div class="benefit-icon">🎯</div>
						<h3 class="text-lg font-semibold text-base mb-2">Desktop Optimized</h3>
						<p class="text-sm text-muted">
							Built for desktop apps with cursor tracking, keyboard navigation, and hover states
						</p>
					</Card>
				</DepthContext>

				<DepthContext>
					<Card class="benefit-card">
						<div class="benefit-icon">🔧</div>
						<h3 class="text-lg font-semibold text-base mb-2">Easy to Use</h3>
						<p class="text-sm text-muted">
							Minimal boilerplate - wrap with ThemeProvider and components handle the rest
						</p>
					</Card>
				</DepthContext>
			</div>
		</VStack>

		<!-- Spacer -->
		<div class="h-24"></div>
	</VStack>

	<!-- Modal Example -->
	<Modal bind:open={modalOpen} size="md">
		<VStack gap="lg">
			<div>
				<h2 class="text-2xl font-bold text-base">Interactive Glass Modal</h2>
				<p class="text-muted mt-2">This modal is at depth 4 with premium glass effects</p>
			</div>

			<div class="depth-badge glass-badge">Depth 4 🪟</div>

			<p class="text-base">
				This modal automatically uses thick glass with all interactive effects enabled:
			</p>

			<ul class="feature-list">
				<li>✨ Cursor-following glow</li>
				<li>🎨 Floating light speckles</li>
				<li>🔄 Scroll-reactive highlights</li>
				<li>💫 Reactive edge lighting</li>
				<li>🌈 Mesh gradient overlays</li>
			</ul>

			<p class="text-sm text-muted">
				Hover around and move your cursor to see the interactive effects in action!
			</p>

			<HStack gap="md" justify="end">
				<Button variant="ghost" onclick={() => (modalOpen = false)}>Close</Button>
				<Button variant="primary" onclick={() => (modalOpen = false)}>Confirm</Button>
			</HStack>
		</VStack>
	</Modal>

	<!-- Toast Container -->
	<Toast />
</ThemeProvider>

<style>
	/* Utility classes */
	.min-h-screen {
		min-height: 100vh;
	}

	.max-w-6xl {
		max-width: 72rem;
	}

	.mx-auto {
		margin-left: auto;
		margin-right: auto;
	}

	.w-full {
		width: 100%;
	}

	.p-8 {
		padding: 2rem;
	}

	.mt-2 {
		margin-top: 0.5rem;
	}

	.mb-2 {
		margin-bottom: 0.5rem;
	}

	.mb-3 {
		margin-bottom: 0.75rem;
	}

	.text-4xl {
		font-size: 2.25rem;
		line-height: 2.5rem;
	}

	.text-2xl {
		font-size: 1.5rem;
		line-height: 2rem;
	}

	.text-xl {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}

	.text-lg {
		font-size: 1.125rem;
		line-height: 1.75rem;
	}

	.text-base {
		font-size: 1rem;
		line-height: 1.5rem;
	}

	.text-sm {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.text-xs {
		font-size: 0.75rem;
		line-height: 1rem;
	}

	.font-bold {
		font-weight: 700;
	}

	.font-semibold {
		font-weight: 600;
	}

	.flex {
		display: flex;
	}

	.flex-wrap {
		flex-wrap: wrap;
	}

	.gap-3 {
		gap: 0.75rem;
	}

	.h-24 {
		height: 6rem;
	}

	/* Info banner */
	.info-banner {
		background: linear-gradient(
			135deg,
			oklch(from var(--waku-accent) calc(l + 0.15) calc(c * 0.3) h / 0.1) 0%,
			oklch(from var(--waku-accent) calc(l + 0.1) calc(c * 0.2) h / 0.05) 100%
		);
		border: 1px solid oklch(from var(--waku-accent) l c h / 0.2);
		border-radius: var(--radius-lg);
		padding: 1rem;
	}

	/* Color selector */
	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 0.75rem;
	}

	.color-option {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem;
		border: 2px solid var(--waku-border);
		border-radius: var(--radius-md);
		background: transparent;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.color-option:hover {
		border-color: var(--preset-color);
		transform: translateY(-2px);
	}

	.color-option.active {
		border-color: var(--preset-color);
		background: oklch(from var(--preset-color) l c h / 0.1);
	}

	.color-circle {
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius-full);
		background: var(--preset-color);
		border: 2px solid white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.color-name {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--waku-fg-base);
	}

	/* Depth badge */
	.depth-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: var(--radius-full);
		font-size: 0.75rem;
		font-weight: 600;
		background: var(--waku-surface-2);
		color: var(--waku-fg-base);
		margin-bottom: 0.5rem;
		border: 1px solid var(--waku-border);
	}

	.glass-badge {
		background: oklch(from var(--waku-accent) calc(l + 0.2) calc(c * 0.5) h / 0.2);
		color: var(--waku-accent);
		border-color: oklch(from var(--waku-accent) l c h / 0.3);
	}

	/* Code block */
	.code-block {
		background: var(--neutral-950);
		color: var(--neutral-50);
		padding: 1rem;
		border-radius: var(--radius-md);
		overflow-x: auto;
		font-size: 0.875rem;
		line-height: 1.5;
		font-family: 'Fira Code', 'Cascadia Code', monospace;
	}

	:global(.dark) .code-block {
		background: var(--neutral-900);
	}

	/* Benefits grid */
	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.benefit-card {
		text-align: center;
	}

	.benefit-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	/* Feature list */
	.feature-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.feature-list li {
		padding: 0.5rem;
		background: var(--waku-surface-1);
		border-radius: var(--radius-sm);
		font-size: 0.875rem;
	}
</style>
