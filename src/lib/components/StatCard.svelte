<script>
	let { icon: Icon, label, value, href = null } = $props();
</script>

{#if href}
	<a {href} class="card p-4 transition hover:brightness-95 block no-underline">
		<div class="flex items-center gap-3">
			<div class="flex items-center justify-center size-10 rounded-lg preset-tonal-primary">
				<Icon class="size-5" />
			</div>
			<div>
				<p class="text-xs uppercase tracking-wider opacity-50">{label}</p>
				<p class="text-2xl font-bold mt-0.5">{value}</p>
			</div>
		</div>
	</a>
{:else}
	<div class="card p-4">
		<div class="flex items-center gap-3">
			<div class="flex items-center justify-center size-10 rounded-lg preset-tonal-primary">
				<Icon class="size-5" />
			</div>
			<div>
				<p class="text-xs uppercase tracking-wider opacity-50">{label}</p>
				<p class="text-2xl font-bold mt-0.5">{value}</p>
			</div>
		</div>
	</div>
{/if}
