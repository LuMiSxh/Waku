<script lang="ts">
	import { resolve } from '$app/paths';

	const showcases = [
		{
			name: 'Button',
			path: '/button' as const as '/',
			description: 'Interactive buttons with variants and sizes.',
			category: 'Interactive'
		},
		{
			name: 'Stack',
			path: '/stack' as const as '/',
			description: 'VStack and HStack for easy layouts.',
			category: 'Layout'
		},
		{
			name: 'Card',
			path: '/card' as const as '/',
			description: 'An elevated container for grouping content.',
			category: 'Layout'
		},
		{
			name: 'Separator',
			path: '/separator' as const as '/',
			description: 'A line to visually divide content.',
			category: 'Layout'
		},
		{
			name: 'Elevation',
			path: '/elevation' as const as '/',
			description: 'Different colors depending on Stack elevation levels.',
			category: 'Layout'
		},
		{
			name: 'Badge',
			path: '/badge' as const as '/',
			description: 'Labels for statuses or properties.',
			category: 'Display'
		},
		{
			name: 'Loading Spinner',
			path: '/loading-spinner' as const as '/',
			description: 'A visual loading indicator.',
			category: 'Feedback'
		},
		{
			name: 'Alert',
			path: '/alert' as const as '/',
			description: 'Prominent messages for users.',
			category: 'Feedback'
		},
		{
			name: 'Input',
			path: '/input' as const as '/',
			description: 'A standard form input field.',
			category: 'Form'
		},
		{
			name: 'Toggle',
			path: '/toggle' as const as '/',
			description: 'A switch for boolean states.',
			category: 'Form'
		},
		{
			name: 'Select',
			path: '/select' as const as '/',
			description: 'A custom dropdown selection component.',
			category: 'Form'
		},
		{
			name: 'Tooltip',
			path: '/tooltip' as const as '/',
			description: 'A small pop-up label for extra info.',
			category: 'Overlay'
		},
		{
			name: 'Modal',
			path: '/modal' as const as '/',
			description: 'A dialog window over the main content.',
			category: 'Overlay'
		},
		{
			name: 'Toast',
			path: '/toast' as const as '/',
			description: 'Transient notifications to inform users.',
			category: 'Feedback'
		}
	];

	const newFeatures = [
		{
			name: 'Interactive Glass',
			path: '/interactive-glass' as const as '/',
			description: 'Liquid glass with reactive highlights, speckles, and cursor tracking.'
		},
		{
			name: 'Depth Showcase',
			path: '/showcase' as const as '/',
			description: 'Automatic depth awareness and ThemeProvider demo.'
		}
	];
</script>

<div class="home-container">
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<h1 class="hero-title">Waku Component Library</h1>
			<p class="hero-description">
				A modern SvelteKit component library with flexible theming, automatic depth awareness, and
				liquid glass effects. Built for desktop applications with cursor and keyboard interactions
				in mind.
			</p>
		</div>
	</section>

	<!-- New Features Section -->
	<section class="features-section">
		<div class="section-header">
			<h2 class="section-title">New Features</h2>
			<div class="new-badge">Latest</div>
		</div>

		<div class="features-grid">
			{#each newFeatures as item (item.path)}
				<a href={resolve(item.path)} class="feature-card">
					<div class="feature-card-content">
						<h3 class="feature-title">{item.name}</h3>
						<p class="feature-description">{item.description}</p>
					</div>
					<div class="feature-arrow">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14m-7-7 7 7-7 7" />
						</svg>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Components Grid -->
	<section class="components-section">
		<div class="section-header">
			<h2 class="section-title">Component Library</h2>
			<p class="section-subtitle">{showcases.length} components available</p>
		</div>

		<div class="components-grid">
			{#each showcases as item (item.path)}
				<a href={resolve(item.path)} class="component-card">
					<div class="component-header">
						<h3 class="component-title">{item.name}</h3>
						<span class="component-category">{item.category}</span>
					</div>
					<p class="component-description">{item.description}</p>
				</a>
			{/each}
		</div>
	</section>

	<!-- Getting Started Section -->
	<section class="getting-started">
		<h2 class="section-title">Getting Started</h2>

		<div class="steps">
			<div class="step">
				<div class="step-number">1</div>
				<div class="step-content">
					<h3 class="step-title">Wrap your app with ThemeProvider</h3>
					<p class="step-description">
						Add ThemeProvider to your root layout to enable depth awareness and set your accent
						color.
					</p>
				</div>
			</div>

			<div class="step">
				<div class="step-number">2</div>
				<div class="step-content">
					<h3 class="step-title">Components auto-style themselves</h3>
					<p class="step-description">
						No manual elevation props needed. Components detect their depth and apply the
						appropriate styling automatically.
					</p>
				</div>
			</div>

			<div class="step">
				<div class="step-number">3</div>
				<div class="step-content">
					<h3 class="step-title">Explore the showcases</h3>
					<p class="step-description">
						Click any component above to see interactive examples, prop documentation, and generated
						code snippets.
					</p>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* Layout */
	.home-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	/* Hero Section */
	.hero {
		text-align: center;
		padding: 2rem 0;
	}

	.hero-content {
		max-width: 720px;
		margin: 0 auto;
	}

	.hero-title {
		font-size: 3.5rem;
		font-weight: 700;
		line-height: 1.1;
		color: var(--waku-fg-base);
		margin: 0 0 1.5rem 0;
		letter-spacing: -0.02em;
	}

	.hero-description {
		font-size: 1.25rem;
		line-height: 1.7;
		color: var(--waku-fg-muted);
		margin: 0;
	}

	/* Section Headers */
	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	.section-title {
		font-size: 2rem;
		font-weight: 600;
		color: var(--waku-fg-base);
		margin: 0;
	}

	.section-subtitle {
		font-size: 0.9375rem;
		color: var(--waku-fg-muted);
		margin: 0;
	}

	.new-badge {
		display: inline-flex;
		align-items: center;
		padding: 0.375rem 0.875rem;
		background: linear-gradient(
			135deg,
			oklch(from var(--waku-accent) l c h / 0.15),
			oklch(from var(--waku-accent) l c h / 0.08)
		);
		color: var(--waku-accent);
		border: 1px solid oklch(from var(--waku-accent) l c h / 0.3);
		border-radius: var(--radius-full);
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.025em;
	}

	/* Features Grid */
	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 1.25rem;
	}

	.feature-card {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.75rem 2rem;
		background: linear-gradient(
			135deg,
			var(--waku-glass-gradient-from),
			var(--waku-glass-gradient-to)
		);
		backdrop-filter: blur(24px) saturate(150%);
		-webkit-backdrop-filter: blur(24px) saturate(150%);
		border: 1px solid oklch(from var(--waku-accent) l c h / 0.25);
		border-radius: var(--radius-xl);
		box-shadow:
			var(--shadow-md),
			inset 0 1px 0 0 oklch(1 0 0 / 0.1),
			0 0 0 0 oklch(from var(--waku-accent) l c h / 0);
		transition:
			transform 280ms var(--spring-smooth),
			box-shadow 320ms var(--spring-smooth),
			border-color 250ms ease-out;
		text-decoration: none;
		overflow: hidden;
	}

	.feature-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle at 80% 50%,
			oklch(from var(--waku-accent) calc(l + 0.1) calc(c * 0.5) h / 0.08) 0%,
			transparent 60%
		);
		opacity: 0;
		transition: opacity 300ms ease-out;
		pointer-events: none;
	}

	.feature-card:hover {
		transform: translateY(-2px);
		border-color: oklch(from var(--waku-accent) l c h / 0.4);
		box-shadow:
			var(--shadow-lg),
			inset 0 1px 0 0 oklch(1 0 0 / 0.15),
			0 0 24px oklch(from var(--waku-accent) l c h / 0.2);
	}

	.feature-card:hover::before {
		opacity: 1;
	}

	.feature-card:active {
		transform: translateY(0) scale(0.99);
		transition-duration: 100ms;
	}

	.feature-card-content {
		flex: 1;
	}

	.feature-title {
		font-size: 1.375rem;
		font-weight: 600;
		color: var(--waku-fg-base);
		margin: 0 0 0.5rem 0;
	}

	.feature-description {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--waku-fg-muted);
		margin: 0;
	}

	.feature-arrow {
		flex-shrink: 0;
		color: oklch(from var(--waku-accent) l c h / 0.6);
		transition: transform 250ms var(--spring-smooth);
	}

	.feature-card:hover .feature-arrow {
		transform: translateX(4px);
		color: var(--waku-accent);
	}

	/* Components Grid */
	.components-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.component-card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1.5rem;
		background: var(--waku-surface-1);
		border: 1px solid var(--waku-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		transition:
			transform 250ms var(--spring-smooth),
			box-shadow 280ms var(--spring-smooth),
			border-color 200ms ease-out;
		text-decoration: none;
	}

	.component-card:hover {
		transform: translateY(-1px);
		border-color: oklch(from var(--waku-border) calc(l + 0.1) c h);
		box-shadow: var(--shadow-md);
	}

	.component-card:active {
		transform: scale(0.99);
		transition-duration: 100ms;
	}

	.component-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.component-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--waku-fg-base);
		margin: 0;
	}

	.component-category {
		flex-shrink: 0;
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.25rem 0.625rem;
		background: oklch(from var(--waku-accent) l c h / 0.1);
		color: oklch(from var(--waku-accent) calc(l - 0.1) c h);
		border-radius: var(--radius-sm);
	}

	.component-description {
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--waku-fg-muted);
		margin: 0;
	}

	/* Getting Started */
	.getting-started {
		padding: 2.5rem 2rem;
		background: var(--waku-surface-1);
		border: 1px solid var(--waku-border);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-sm);
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-top: 2rem;
	}

	.step {
		display: flex;
		gap: 1.5rem;
		align-items: flex-start;
	}

	.step-number {
		flex-shrink: 0;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(
			135deg,
			oklch(from var(--waku-accent) l c h / 0.15),
			oklch(from var(--waku-accent) l c h / 0.08)
		);
		color: var(--waku-accent);
		font-weight: 700;
		font-size: 1.125rem;
		border-radius: var(--radius-full);
		border: 1px solid oklch(from var(--waku-accent) l c h / 0.25);
	}

	.step-content {
		flex: 1;
	}

	.step-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--waku-fg-base);
		margin: 0 0 0.5rem 0;
	}

	.step-description {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--waku-fg-muted);
		margin: 0;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.home-container {
			padding: 2rem 1rem;
			gap: 3rem;
		}

		.hero-title {
			font-size: 2.5rem;
		}

		.hero-description {
			font-size: 1.125rem;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}

		.components-grid {
			grid-template-columns: 1fr;
		}

		.section-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}
	}
</style>
