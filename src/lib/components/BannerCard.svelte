<script>
	let { label, title, detail, date } = $props();
</script>

<div class="card p-5 border-2 border-primary-500/30">
	<p class="text-xs uppercase tracking-wider opacity-50 mb-1">{label}</p>
	<p class="text-xl font-bold">{title}</p>
	{#if detail}
		<p class="opacity-70 mt-1">{detail}</p>
	{/if}
	{#if date}
		<p class="text-sm opacity-50 mt-1">{date}</p>
	{/if}
</div>
