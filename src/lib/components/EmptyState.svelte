<script>
	let { message, href, linkText } = $props();
</script>

<div class="text-center py-16 opacity-50">
	<p class="text-lg">{message}</p>
	{#if href}
		<a {href} class="text-sm underline mt-2 inline-block">{linkText}</a>
	{/if}
</div>
