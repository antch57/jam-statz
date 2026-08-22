<script>
	let { icon: Icon, label, value, subtext = null } = $props();
</script>

<div class="card p-4">
	<div class="flex items-center gap-2 text-sm opacity-50 mb-1">
		<Icon class="size-4" /> {label}
	</div>
	<p class="font-semibold">{value}</p>
	{#if subtext}
		<p class="text-sm opacity-60">{subtext}</p>
	{/if}
</div>
