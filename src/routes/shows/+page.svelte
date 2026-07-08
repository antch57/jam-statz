<script>
	import { shows } from '$lib/data/shows.js';
	import { Search } from '@lucide/svelte';

	let query = $state('');
	let sortOrder = $state('newest');

	const sorted = $derived.by(() => {
		const sorted = [...shows].sort((a, b) => {
			const diff = new Date(b.date) - new Date(a.date);
			return sortOrder === 'newest' ? diff : -diff;
		});
		if (!query) return sorted;
		const q = query.toLowerCase();
		return sorted.filter(
			(s) =>
				s.artist.toLowerCase().includes(q) ||
				s.venue.toLowerCase().includes(q) ||
				s.city.toLowerCase().includes(q)
		);
	});
</script>

<h1 class="h1">Shows</h1>
<p class="text-lg opacity-70 mt-1 mb-8">Browse your show history.</p>

<!-- Search + Sort -->
<div class="flex items-center gap-3 mb-6">
	<div class="relative flex-1">
		<Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-50" />
		<input
			type="search"
			class="input w-full pl-10"
			placeholder="Search by artist, venue, or city..."
			bind:value={query}
		/>
	</div>
	<select class="select w-36" bind:value={sortOrder}>
		<option value="newest">Newest</option>
		<option value="oldest">Oldest</option>
	</select>
</div>

<!-- Show cards -->
<div class="space-y-3">
	{#each sorted as show (show.id)}
		<div class="card p-4">
			<div class="flex items-start justify-between">
				<div>
					<p class="font-semibold text-lg">{show.artist}</p>
					<p class="text-sm opacity-60">{show.venue}, {show.city}</p>
					<p class="text-xs opacity-50 mt-0.5">{show.date}</p>
					{#if show.notes}
						<p class="text-sm mt-2 italic opacity-70">"{show.notes}"</p>
					{/if}
				</div>
				<div class="text-right">
					<p class="font-mono text-sm">{'★'.repeat(show.rating)}{'☆'.repeat(5 - show.rating)}</p>
				</div>
			</div>
		</div>
	{/each}
	{#if sorted.length === 0}
		<p class="text-center py-12 opacity-50">No shows match your search.</p>
	{/if}
</div>
