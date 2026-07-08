<script>
	import { artists } from '$lib/data/artists.js';
</script>

<h1 class="h1">Artists</h1>
<p class="text-lg opacity-70 mt-1 mb-8">All the jam bands you've tracked.</p>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
	{#each artists as artist (artist.id)}
		<div class="card p-4">
			<h2 class="h4 mb-1">{artist.name}</h2>
			<p class="text-sm opacity-60 mb-3">{artist.genre}</p>
			<div class="flex items-center justify-between text-sm">
				<span class="opacity-70">{artist.showsAttended} shows</span>
				<span class="opacity-50">Last: {artist.lastShow}</span>
			</div>
		</div>
	{/each}
</div>
