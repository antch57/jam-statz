<script>
	let { title, items, icon: Icon = null } = $props();
</script>

<div class="card p-5 preset-tonal-primary">
	<div class="flex items-center gap-2 mb-3">
		{#if Icon}
			<Icon class="size-5" />
		{/if}
		<p class="text-sm font-bold uppercase tracking-wider">{title}</p>
	</div>
	<ul class="space-y-2">
		{#each items as item, i}
			<li>
				<a
					href={item.href}
					class="flex items-center justify-between py-2.5 border-b border-surface-200-800 last:border-0 no-underline hover:opacity-80 transition"
				>
					<div class="flex items-center gap-3">
						<span class="text-xs font-mono opacity-40 w-4">{i + 1}</span>
						<div>
							<span class="font-medium">{item.name}</span>
							{#if item.subtext}
								<span class="text-sm opacity-50 ml-2">{item.subtext}</span>
							{/if}
						</div>
					</div>
					<span class="text-sm opacity-50">{item.value}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>
