<script>
	let { title, subtitle } = $props();
</script>

<div class="mb-8">
	<h1 class="text-3xl md:text-5xl font-bold">{title}</h1>
	{#if subtitle}
		<p class="text-lg opacity-70 mt-1">{subtitle}</p>
	{/if}
</div>
