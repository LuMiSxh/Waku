<script lang="ts">
	import { Modal, Button, VStack, HStack, Input } from '$lib/index.js';
	let isModalOpen = $state(false);
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Modal</h2>
		<p style="color: var(--waku-fg-muted);">A dialog window that appears over the main content.</p>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Trigger</h3>
		<Button onclick={() => (isModalOpen = true)}>Open Modal</Button>
	</section>

	<Modal bind:open={isModalOpen}>
		<VStack gap="md" align="stretch">
			<h3 class="text-xl font-bold">Create New Project</h3>
			<p style="color: var(--waku-fg-muted);">
				Press Escape or click the backdrop to close. Focus is trapped inside.
			</p>
			<Input placeholder="Project name..." />
			<HStack justify="end">
				<Button variant="secondary" onclick={() => (isModalOpen = false)}>Cancel</Button>
				<Button onclick={() => (isModalOpen = false)}>Create</Button>
			</HStack>
		</VStack>
	</Modal>
</div>
