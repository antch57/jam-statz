<script>
	import { ArrowLeft } from '@lucide/svelte';

	let { href, label } = $props();
</script>

<a {href} class="inline-flex items-center gap-1 text-sm opacity-60 hover:opacity-100 mb-6 no-underline">
	<ArrowLeft class="size-4" /> {label}
</a>
