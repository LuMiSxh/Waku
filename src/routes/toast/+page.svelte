<script lang="ts">
	import Toast, { toast } from '$lib/components/Toast.svelte';
	import { Button, Card, VStack } from '$lib/index.js';
</script>

<Toast />
<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Toast</h2>
		<p style="color: var(--waku-fg-muted);">
			An ephemeral notification system for providing timely feedback.
		</p>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Triggers</h3>
		<p class="mb-4" style="color: var(--waku-fg-muted);">
			Click the buttons below to trigger different types of toasts.
		</p>
		<div class="flex flex-wrap gap-4">
			<Button
				onclick={() =>
					toast({
						title: 'Success!',
						description: 'Your profile has been updated.',
						type: 'success'
					})}
			>
				Success Toast
			</Button>
			<Button
				onclick={() =>
					toast({ title: 'Error', description: 'Could not connect to the server.', type: 'error' })}
			>
				Error Toast
			</Button>
			<Button
				onclick={() =>
					toast({
						title: 'Warning',
						description: 'Your trial expires in 3 days.',
						type: 'warning'
					})}
			>
				Warning Toast
			</Button>
			<Button onclick={() => toast('This is an informational message.')}>
				Info Toast (Simple)
			</Button>
		</div>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Usage</h3>
		<VStack align="stretch" gap="lg">
			<Card elevation={2}>
				<h4 class="font-bold">Step 1: Add the container</h4>
				<p class="text-sm" style="color: var(--waku-fg-muted);">
					Place the <code>&lt;Toast /&gt;</code> component once in your root layout file (e.g.,
					<code>+layout.svelte</code>).
				</p>
				<pre class="mt-2"><code>
{`<script>
import Toast from '$lib/components/Toast.svelte';
</script>
<Toast/>`}</code
					></pre>
			</Card>
			<Card elevation={2}>
				<h4 class="font-bold">Step 2: Call the toast function</h4>
				<p class="text-sm" style="color: var(--waku-fg-muted);">
					Import and call <code>toast()</code> from any component or script.
				</p>
				<pre class="mt-2"><code>
{`<script>
import {toast} from '$lib/components/Toast.svelte';
</script>

<button onclick={() => toast('Hello, World!')}>
  Show Toast
</button>
`}</code
					></pre>
			</Card>
		</VStack>
	</section>
</div>

<style>
	pre {
		background-color: oklch(from var(--waku-surface-1) l c h / 0.5);
		padding: 0.75rem;
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		margin-top: 0.5rem;
	}
</style>
