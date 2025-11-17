<script lang="ts">
	import { ComponentShowcase, stories } from '$lib/showcase';
	import { VStack } from '$lib/layout';

	// Show both VStack and HStack on same page
</script>

<VStack gap="2xl">
	<ComponentShowcase story={stories.vstack} />
	<ComponentShowcase story={stories.hstack} />
</VStack>
