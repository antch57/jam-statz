<script>
	let { setlist } = $props();

	const sections = [
		{ key: 'set1', label: 'Set 1' },
		{ key: 'set2', label: 'Set 2' },
		{ key: 'encore', label: 'Encore' },
	];
</script>

{#if setlist}
	<div class="space-y-6">
		{#each sections as section}
			{#if setlist[section.key]?.length}
				<div class="card p-5">
					<h3 class="font-bold text-sm uppercase tracking-wider opacity-50 mb-3">{section.label}</h3>
					<ol class="space-y-1.5">
						{#each setlist[section.key] as song, i}
							<li class="flex items-baseline gap-3">
								<span class="text-xs opacity-30 font-mono w-4 text-right">{i + 1}</span>
								<span>{song}</span>
							</li>
						{/each}
					</ol>
				</div>
			{/if}
		{/each}
	</div>

	<p class="text-sm opacity-40 mt-4">
		{setlist.set1.length + setlist.set2.length + setlist.encore.length} songs played
	</p>
{/if}
