<script lang="ts">
	import type { ComponentStory } from './types.js';
	import { VStack, HStack, Card } from '$lib/layout';

	interface Props {
		story: ComponentStory;
	}

	let { story }: Props = $props();

	// Generate code snippet from example
	function generateCode(example: typeof story.examples[0]): string {
		const lines: string[] = [];

		// Import statement
		lines.push(`import { ${story.name} } from '${story.importPath}';`);
		lines.push('');

		// Component usage
		const propsStr = Object.entries(example.props)
			.map(([key, value]) => {
				if (typeof value === 'string') return `${key}="${value}"`;
				if (typeof value === 'boolean' && value) return key;
				if (typeof value === 'number') return `${key}={${value}}`;
				return `${key}={${JSON.stringify(value)}}`;
			})
			.join(' ');

		if (example.slots?.default) {
			lines.push(`<${story.name} ${propsStr}>`);
			lines.push(`  ${example.slots.default}`);
			lines.push(`</${story.name}>`);
		} else {
			lines.push(`<${story.name} ${propsStr} />`);
		}

		return lines.join('\n');
	}

	// Get prop display value
	function formatPropValue(value: unknown): string {
		if (value === undefined) return 'undefined';
		if (typeof value === 'string') return `"${value}"`;
		if (typeof value === 'boolean') return value.toString();
		return JSON.stringify(value);
	}
</script>

<VStack gap="2xl" class="max-w-6xl mx-auto w-full px-4 py-8">
	<!-- Header Section -->
	<VStack gap="md">
		<div>
			<h1 class="component-title">{story.name}</h1>
			<p class="component-description">{story.description}</p>
		</div>

		{#if story.category}
			<div class="inline-flex">
				<span class="category-badge">{story.category}</span>
			</div>
		{/if}
	</VStack>

	<!-- Props API Documentation -->
	<Card>
		<VStack gap="lg">
			<h2 class="section-title">Properties</h2>

			<div class="props-table-wrapper">
				<table class="props-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{#each story.props as prop}
							<tr>
								<td>
									<code class="prop-name">{prop.name}</code>
									{#if prop.required}
										<span class="required-badge">required</span>
									{/if}
								</td>
								<td>
									<code class="prop-type">{prop.type}</code>
									{#if prop.options && prop.options.length > 0}
										<div class="prop-options">
											{#each prop.options as option}
												<code class="option-value">{formatPropValue(option)}</code>
											{/each}
										</div>
									{/if}
								</td>
								<td>
									<code class="prop-default">{formatPropValue(prop.default)}</code>
								</td>
								<td class="prop-description">
									{prop.description || '-'}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</VStack>
	</Card>

	<!-- Interactive Examples -->
	<VStack gap="lg">
		<h2 class="section-title">Examples</h2>

		{#each story.examples as example, i (i)}
			<Card>
				<VStack gap="lg">
					<!-- Example Header -->
					<div>
						<h3 class="example-title">{example.name}</h3>
						{#if example.description}
							<p class="example-description">{example.description}</p>
						{/if}
					</div>

					<!-- Live Preview -->
					<div class="preview-container">
						<div class="preview-header">
							<span class="preview-label">Live Preview</span>
						</div>
						<div class="preview-content">
							<!-- Render component with props, handle slots specially -->
							{#if example.slots?.default}
								<svelte:component this={story.component} {...example.props}>
									<!-- Render slot content as HTML since it's trusted from our stories -->
									{@html example.slots.default}
								</svelte:component>
							{:else}
								<svelte:component this={story.component} {...example.props} />
							{/if}
						</div>
					</div>

					<!-- Generated Code -->
					<div class="code-container">
						<div class="code-header">
							<span class="code-label">Code</span>
							<button
								class="copy-button"
								onclick={() => navigator.clipboard.writeText(generateCode(example))}
								title="Copy code"
							>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
								</svg>
							</button>
						</div>
						<pre class="code-block"><code>{generateCode(example)}</code></pre>
					</div>
				</VStack>
			</Card>
		{/each}
	</VStack>
</VStack>

<style>
	/* Layout */
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

	.px-4 {
		padding-left: 1rem;
		padding-right: 1rem;
	}

	.py-8 {
		padding-top: 2rem;
		padding-bottom: 2rem;
	}

	.inline-flex {
		display: inline-flex;
	}

	/* Typography */
	.component-title {
		font-size: 3rem;
		font-weight: 700;
		line-height: 1.2;
		color: var(--waku-fg-base);
		margin: 0;
	}

	.component-description {
		font-size: 1.25rem;
		line-height: 1.6;
		color: var(--waku-fg-muted);
		margin-top: 0.75rem;
	}

	.section-title {
		font-size: 1.75rem;
		font-weight: 600;
		color: var(--waku-fg-base);
		margin: 0;
	}

	.example-title {
		font-size: 1.375rem;
		font-weight: 600;
		color: var(--waku-fg-base);
		margin: 0;
	}

	.example-description {
		font-size: 0.9375rem;
		color: var(--waku-fg-muted);
		margin-top: 0.375rem;
	}

	/* Category Badge */
	.category-badge {
		display: inline-block;
		padding: 0.375rem 0.875rem;
		border-radius: var(--radius-full);
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		background: oklch(from var(--waku-accent) l c h / 0.12);
		color: var(--waku-accent);
		border: 1px solid oklch(from var(--waku-accent) l c h / 0.25);
		text-transform: uppercase;
	}

	/* Props Table */
	.props-table-wrapper {
		overflow-x: auto;
		border-radius: var(--radius-lg);
		border: 1px solid var(--waku-border);
	}

	.props-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	.props-table thead {
		background: var(--waku-surface-2);
		border-bottom: 2px solid var(--waku-border);
	}

	.props-table th {
		padding: 0.875rem 1.25rem;
		text-align: left;
		font-weight: 600;
		color: var(--waku-fg-base);
		white-space: nowrap;
	}

	.props-table tbody tr {
		border-bottom: 1px solid var(--waku-border);
		background: var(--waku-surface-1);
		transition: background-color 0.15s;
	}

	.props-table tbody tr:last-child {
		border-bottom: none;
	}

	.props-table tbody tr:hover {
		background: var(--waku-surface-2);
	}

	.props-table td {
		padding: 1rem 1.25rem;
		vertical-align: top;
	}

	.prop-name {
		font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
		font-size: 0.875rem;
		font-weight: 600;
		color: oklch(from var(--waku-accent) calc(l - 0.05) c h);
		background: oklch(from var(--waku-accent) l c h / 0.08);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
	}

	.prop-type {
		font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
		font-size: 0.8125rem;
		color: var(--color-info);
		background: oklch(from var(--color-info) l c h / 0.12);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
		border: 1px solid oklch(from var(--color-info) l c h / 0.2);
	}

	.prop-default {
		font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
		font-size: 0.8125rem;
		color: var(--waku-fg-muted);
		background: var(--waku-surface-2);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
	}

	.prop-description {
		color: var(--waku-fg-muted);
		line-height: 1.6;
	}

	.prop-options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin-top: 0.625rem;
	}

	.option-value {
		font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
		font-size: 0.75rem;
		background: var(--waku-surface-0);
		color: var(--waku-fg-muted);
		padding: 0.1875rem 0.5rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--waku-border);
	}

	.required-badge {
		margin-left: 0.625rem;
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--color-danger);
		text-transform: uppercase;
		background: oklch(from var(--color-danger) l c h / 0.12);
		padding: 0.1875rem 0.4375rem;
		border-radius: var(--radius-sm);
		border: 1px solid oklch(from var(--color-danger) l c h / 0.2);
	}

	/* Preview Container */
	.preview-container {
		border-radius: var(--radius-lg);
		overflow: hidden;
		border: 1px solid var(--waku-border);
	}

	.preview-header {
		background: var(--waku-surface-2);
		padding: 0.75rem 1.25rem;
		border-bottom: 1px solid var(--waku-border);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.preview-label {
		font-size: 0.8125rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--waku-fg-muted);
	}

	.preview-content {
		padding: 3rem;
		background:
			radial-gradient(circle at 20% 50%, oklch(from var(--waku-accent) l c h / 0.03) 0%, transparent 50%),
			radial-gradient(circle at 80% 80%, oklch(from var(--waku-accent) calc(l + 0.05) calc(c * 0.8) calc(h + 30) / 0.04) 0%, transparent 50%),
			var(--waku-surface-0);
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 140px;
	}

	/* Code Block */
	.code-container {
		border-radius: var(--radius-lg);
		overflow: hidden;
		border: 1px solid var(--waku-border);
	}

	.code-header {
		background: var(--waku-surface-2);
		padding: 0.75rem 1.25rem;
		border-bottom: 1px solid var(--waku-border);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.code-label {
		font-size: 0.8125rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--waku-fg-muted);
	}

	.copy-button {
		background: transparent;
		border: 1px solid var(--waku-border);
		border-radius: var(--radius-sm);
		padding: 0.375rem 0.625rem;
		color: var(--waku-fg-muted);
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.copy-button:hover {
		background: var(--waku-surface-1);
		color: var(--waku-fg-base);
		border-color: var(--waku-accent);
	}

	.copy-button:active {
		transform: scale(0.95);
	}

	.code-block {
		margin: 0;
		padding: 1.75rem 1.5rem;
		background: var(--neutral-950);
		color: var(--neutral-50);
		font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
		font-size: 0.875rem;
		line-height: 1.7;
		overflow-x: auto;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global(.dark) .code-block {
		background: var(--neutral-900);
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.component-title {
			font-size: 2.25rem;
		}

		.component-description {
			font-size: 1rem;
		}

		.preview-content {
			padding: 2rem 1rem;
		}

		.props-table-wrapper {
			border: none;
		}

		.props-table {
			display: block;
		}

		.props-table thead {
			display: none;
		}

		.props-table tbody {
			display: block;
		}

		.props-table tr {
			display: block;
			margin-bottom: 1rem;
			border: 1px solid var(--waku-border);
			border-radius: var(--radius-md);
			overflow: hidden;
		}

		.props-table td {
			display: block;
			padding: 0.75rem 1rem;
			border-bottom: 1px solid var(--waku-border);
		}

		.props-table td:last-child {
			border-bottom: none;
		}

		.props-table td:first-child {
			background: var(--waku-surface-2);
			font-weight: 600;
		}

		.props-table td:before {
			content: attr(data-label);
			font-weight: 600;
			display: block;
			margin-bottom: 0.375rem;
			color: var(--waku-fg-muted);
			font-size: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		.props-table tbody tr:first-child td:before {
			content: '';
		}
	}
</style>
