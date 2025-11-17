<script lang="ts">
	import type { ComponentStory } from './types.js';
	import { VStack, HStack, Card } from '$lib/layout';
	import type { Snippet } from 'svelte';

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

<VStack gap="2xl" class="max-w-6xl mx-auto">
	<!-- Header -->
	<VStack gap="md">
		<div>
			<h1 class="text-4xl font-bold text-base">{story.name}</h1>
			<p class="text-lg text-muted mt-2">{story.description}</p>
		</div>

		{#if story.category}
			<div class="inline-flex">
				<span class="category-badge">{story.category}</span>
			</div>
		{/if}
	</VStack>

	<!-- Props API -->
	<Card>
		<VStack gap="lg">
			<h2 class="text-2xl font-semibold text-base">Props</h2>

			<div class="props-table">
				<div class="props-header">
					<div class="props-cell">Name</div>
					<div class="props-cell">Type</div>
					<div class="props-cell">Default</div>
					<div class="props-cell">Description</div>
				</div>

				{#each story.props as prop}
					<div class="props-row">
						<div class="props-cell">
							<code class="prop-name">{prop.name}</code>
							{#if prop.required}
								<span class="required-badge">required</span>
							{/if}
						</div>
						<div class="props-cell">
							<code class="prop-type">{prop.type}</code>
							{#if prop.options && prop.options.length > 0}
								<div class="prop-options">
									{#each prop.options as option}
										<code class="option-value">{formatPropValue(option)}</code>
									{/each}
								</div>
							{/if}
						</div>
						<div class="props-cell">
							<code class="prop-default">{formatPropValue(prop.default)}</code>
						</div>
						<div class="props-cell text-muted">
							{prop.description || '-'}
						</div>
					</div>
				{/each}
			</div>
		</VStack>
	</Card>

	<!-- Examples -->
	<VStack gap="lg">
		<h2 class="text-2xl font-semibold text-base">Examples</h2>

		{#each story.examples as example, i (i)}
			<Card>
				<VStack gap="lg">
					<!-- Example Header -->
					<div>
						<h3 class="text-xl font-semibold text-base">{example.name}</h3>
						{#if example.description}
							<p class="text-muted mt-1">{example.description}</p>
						{/if}
					</div>

					<!-- Live Preview -->
					<div class="preview-container">
						<div class="preview-label">Preview</div>
						<div class="preview-content">
							<svelte:component this={story.component} {...example.props}>
								{#if example.slots?.default}
									{example.slots.default}
								{/if}
							</svelte:component>
						</div>
					</div>

					<!-- Generated Code -->
					<div class="code-container">
						<div class="code-header">
							<span class="code-label">Code</span>
						</div>
						<pre class="code-block"><code>{generateCode(example)}</code></pre>
					</div>
				</VStack>
			</Card>
		{/each}
	</VStack>
</VStack>

<style>
	/* Utilities */
	.max-w-6xl {
		max-width: 72rem;
	}

	.mx-auto {
		margin-left: auto;
		margin-right: auto;
	}

	.mt-1 {
		margin-top: 0.25rem;
	}

	.mt-2 {
		margin-top: 0.5rem;
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

	.font-bold {
		font-weight: 700;
	}

	.font-semibold {
		font-weight: 600;
	}

	.inline-flex {
		display: inline-flex;
	}

	/* Category Badge */
	.category-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: var(--radius-full);
		font-size: 0.75rem;
		font-weight: 600;
		background: oklch(from var(--waku-accent) l c h / 0.1);
		color: var(--waku-accent);
		border: 1px solid oklch(from var(--waku-accent) l c h / 0.2);
		text-transform: uppercase;
	}

	/* Props Table */
	.props-table {
		display: grid;
		grid-template-columns: 200px 180px 120px 1fr;
		gap: 0;
		border: 1px solid var(--waku-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		font-size: 0.875rem;
	}

	.props-header {
		display: contents;
	}

	.props-header .props-cell {
		background: var(--waku-surface-2);
		font-weight: 600;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--waku-border);
	}

	.props-row {
		display: contents;
	}

	.props-row:not(:last-child) .props-cell {
		border-bottom: 1px solid var(--waku-border);
	}

	.props-cell {
		padding: 0.75rem 1rem;
		background: var(--waku-surface-1);
	}

	.props-cell:not(:last-child) {
		border-right: 1px solid var(--waku-border);
	}

	.prop-name {
		font-family: 'Fira Code', 'Cascadia Code', monospace;
		font-size: 0.875rem;
		color: oklch(from var(--waku-accent) calc(l - 0.1) c h);
		font-weight: 600;
	}

	.prop-type {
		font-family: 'Fira Code', 'Cascadia Code', monospace;
		font-size: 0.8125rem;
		color: var(--color-info);
		background: oklch(from var(--color-info) l c h / 0.1);
		padding: 0.125rem 0.375rem;
		border-radius: var(--radius-sm);
	}

	.prop-default {
		font-family: 'Fira Code', 'Cascadia Code', monospace;
		font-size: 0.8125rem;
		color: var(--waku-fg-muted);
	}

	.prop-options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		margin-top: 0.5rem;
	}

	.option-value {
		font-family: 'Fira Code', 'Cascadia Code', monospace;
		font-size: 0.75rem;
		background: var(--waku-surface-2);
		padding: 0.125rem 0.375rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--waku-border);
	}

	.required-badge {
		margin-left: 0.5rem;
		font-size: 0.625rem;
		font-weight: 600;
		color: var(--color-danger);
		text-transform: uppercase;
		background: oklch(from var(--color-danger) l c h / 0.1);
		padding: 0.125rem 0.375rem;
		border-radius: var(--radius-sm);
	}

	/* Preview */
	.preview-container {
		border: 1px solid var(--waku-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.preview-label {
		background: var(--waku-surface-2);
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--waku-fg-muted);
		border-bottom: 1px solid var(--waku-border);
	}

	.preview-content {
		padding: 2rem;
		background: var(--waku-surface-0);
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 120px;
	}

	/* Code Block */
	.code-container {
		border: 1px solid var(--waku-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.code-header {
		background: var(--waku-surface-2);
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--waku-border);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.code-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--waku-fg-muted);
	}

	.code-block {
		margin: 0;
		padding: 1.5rem;
		background: var(--neutral-950);
		color: var(--neutral-50);
		font-family: 'Fira Code', 'Cascadia Code', monospace;
		font-size: 0.875rem;
		line-height: 1.6;
		overflow-x: auto;
	}

	:global(.dark) .code-block {
		background: var(--neutral-900);
	}

	@media (max-width: 768px) {
		.props-table {
			grid-template-columns: 1fr;
		}

		.props-header {
			display: none;
		}

		.props-cell:not(:last-child) {
			border-right: none;
			border-bottom: 1px solid var(--waku-border);
		}

		.props-row .props-cell:first-child {
			font-weight: 600;
			background: var(--waku-surface-2);
		}
	}
</style>
