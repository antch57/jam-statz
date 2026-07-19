<script>
	let { show, href = null } = $props();
</script>

<a href={href || `/shows/${show.id}`} class="card p-4 transition hover:brightness-95 block no-underline">
	<div class="flex items-start justify-between gap-4">
		<div>
			<p class="font-semibold">{show.artist}</p>
			<p class="text-sm opacity-60">{show.venue}, {show.city}</p>
			<p class="text-xs opacity-40 mt-1 font-mono">{show.date}{show.duration ? ` · ${show.duration}` : ''}</p>
			{#if show.notes}
				<p class="text-sm mt-2 italic opacity-60">"{show.notes}"</p>
			{/if}
		</div>
	</div>
</a>
