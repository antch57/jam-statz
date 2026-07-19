<script>
	import { shows } from '$lib/data/shows.js';
	import PageHeader from '$lib/components/PageHeader.svelte';

	const venues = Object.values(
		shows.reduce((acc, show) => {
			if (!acc[show.venue]) {
				acc[show.venue] = {
					venue: show.venue,
					city: show.city,
					shows: 0,
					lastShow: show.date,
				};
			}
			acc[show.venue].shows++;
			if (show.date > acc[show.venue].lastShow) {
				acc[show.venue].lastShow = show.date;
			}
			return acc;
		}, {})
	).sort((a, b) => b.shows - a.shows);
</script>

<PageHeader title="Venues" subtitle="Every place you've seen a show." />

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
	{#each venues as v (v.venue)}
		<a href="/venues/{encodeURIComponent(v.venue)}" class="card p-5 transition hover:brightness-95 block no-underline">
			<h2 class="font-bold text-lg">{v.venue}</h2>
			<p class="text-sm opacity-60">{v.city}</p>
			<div class="mt-4 pt-3 border-t border-surface-200-800 flex items-center justify-between text-sm">
				<span class="font-semibold">{v.shows} show{v.shows !== 1 ? 's' : ''}</span>
				<span class="opacity-50">Last: {v.lastShow}</span>
			</div>
		</a>
	{/each}
</div>
