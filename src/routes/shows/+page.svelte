<script>
	import { shows } from '$lib/data/shows.js';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import ShowCard from '$lib/components/ShowCard.svelte';
	import { Search } from '@lucide/svelte';

	let query = $state('');
	let sortOrder = $state('newest');

	const filtered = $derived.by(() => {
		const sorted = [...shows]
			.filter((s) => s.attended)
			.sort((a, b) => {
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

<PageHeader title="Shows" subtitle="Browse your show history." />

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

<p class="text-sm opacity-50 mb-4">{filtered.length} show{filtered.length !== 1 ? 's' : ''}</p>

<div class="space-y-3">
	{#each filtered as show (show.id)}
		<ShowCard {show} />
	{/each}
	{#if filtered.length === 0}
		<p class="text-center py-12 opacity-50">No shows match your search.</p>
	{/if}
</div>
