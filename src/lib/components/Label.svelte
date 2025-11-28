<script lang="ts">
	interface Props {
		text: string;
		class?: string;
		for?: string;
	}
	let { text, for: forId, class: className }: Props = $props();
</script>

<label for={forId} class="bento-label {className || ''}">
	{text}
</label>

<style>
	.bento-label {
		font-size: 0.75rem; /* 12px */
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--waku-fg-muted);
		margin-bottom: 0.5rem;
		display: block;
	}
</style>
