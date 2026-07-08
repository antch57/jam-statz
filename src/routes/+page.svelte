<script>
	import { stats } from '$lib/data/stats.js';
	import { getRecentShows } from '$lib/data/shows.js';

	const recent = getRecentShows(5);
</script>

<h1 class="h1">Dashboard</h1>
<p class="text-lg opacity-70 mt-1 mb-8">Your show tracking at a glance.</p>

<!-- Stat cards -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
	<div class="card p-4">
		<p class="text-xs uppercase tracking-wider opacity-50">Total Shows</p>
		<p class="h2 mt-1">{stats.totalShows}</p>
	</div>
	<div class="card p-4">
		<p class="text-xs uppercase tracking-wider opacity-50">Artists</p>
		<p class="h2 mt-1">{stats.totalArtists}</p>
	</div>
	<div class="card p-4">
		<p class="text-xs uppercase tracking-wider opacity-50">Venues</p>
		<p class="h2 mt-1">{stats.uniqueVenues}</p>
	</div>
	<div class="card p-4">
		<p class="text-xs uppercase tracking-wider opacity-50">Avg Rating</p>
		<p class="h2 mt-1">{stats.ratings.avg}</p>
	</div>
</div>

<!-- Next Show -->
<div class="card p-6 mb-8 preset-filled-primary-500">
	<p class="text-xs uppercase tracking-wider opacity-70">Next Show</p>
	<p class="h3 mt-1">{stats.mostRecentShow.artist}</p>
	<p class="mt-1 opacity-80">{stats.mostRecentShow.venue}, {stats.mostRecentShow.city}</p>
	<p class="text-sm opacity-60">{stats.mostRecentShow.date}</p>
</div>

<!-- Top Artist + Recent Shows -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
	<div class="card p-4">
		<h2 class="h3 mb-3">Most Seen Artist</h2>
		<p class="text-xl font-semibold">{stats.topArtist.name}</p>
		<p class="text-sm opacity-60">{stats.topArtist.count} shows attended</p>
	</div>

	<div class="card p-4">
		<h2 class="h3 mb-3">Recent Shows</h2>
		<ul class="space-y-2">
			{#each recent as show}
				<li class="flex items-center justify-between py-1 border-b border-surface-200-800 last:border-0">
					<div>
						<p class="font-medium">{show.artist}</p>
						<p class="text-sm opacity-60">{show.venue}, {show.city}</p>
					</div>
					<div class="text-right text-sm">
						<p class="opacity-60">{show.date}</p>
						<p class="font-mono text-xs">{'★'.repeat(show.rating)}{'☆'.repeat(5 - show.rating)}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
