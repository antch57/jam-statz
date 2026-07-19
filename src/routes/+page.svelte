<script>
	import { stats } from '$lib/data/stats.js';
	import { getRecentShows } from '$lib/data/shows.js';
	import StatCard from '$lib/components/StatCard.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import RankedList from '$lib/components/RankedList.svelte';
	import { Music, Users, MapPin, Trophy, Clock } from '@lucide/svelte';

	const recent = getRecentShows(5);

	const topArtistItems = stats.topArtists.map((a) => ({
		name: a.name,
		value: a.count,
		href: `/artists/${a.id}`,
	}));

	const topVenueItems = stats.topVenues.map((v) => ({
		name: v.venue,
		subtext: v.city,
		value: v.count,
		href: `/venues/${encodeURIComponent(v.venue)}`,
	}));
</script>

<PageHeader title="Dashboard" subtitle="Your show tracking at a glance." />

<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
	<StatCard icon={Music} label="Total Shows" value={stats.totalShows} href="/shows" />
	<StatCard icon={Users} label="Artists" value={stats.totalArtists} href="/artists" />
	<StatCard icon={MapPin} label="Venues" value={stats.uniqueVenues} href="/venues" />
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
	<RankedList title="Top 5 Artists" items={topArtistItems} icon={Trophy} />
	<RankedList title="Top 5 Venues" items={topVenueItems} icon={MapPin} />
</div>

<div class="card p-5 preset-tonal-primary">
	<div class="flex items-center gap-2 mb-3">
		<Clock class="size-5" />
		<p class="text-sm font-bold uppercase tracking-wider">Recent Shows</p>
	</div>
	<ul class="space-y-3">
		{#each recent as show}
			<li>
				<a href="/shows/{show.id}" class="flex items-center justify-between py-2 border-b border-surface-200-800 last:border-0 no-underline hover:opacity-80 transition">
					<div>
						<p class="font-medium">{show.artist}</p>
						<p class="text-sm opacity-60">{show.venue}, {show.city}</p>
					</div>
					<p class="text-sm opacity-50 font-mono">{show.date}</p>
				</a>
			</li>
		{/each}
	</ul>
</div>
