<script>
	import { shows } from '$lib/data/shows.js';

	const sorted = [...shows].sort((a, b) => new Date(b.date) - new Date(a.date));
</script>

<h1 class="h1">History</h1>
<p class="text-lg opacity-70 mt-1 mb-8">Every show you've ever caught.</p>

<div class="overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr>
				<th>Date</th>
				<th>Artist</th>
				<th>Venue</th>
				<th>City</th>
				<th>Rating</th>
				<th>Notes</th>
			</tr>
		</thead>
		<tbody>
			{#each sorted as show (show.id)}
				<tr>
					<td class="whitespace-nowrap font-mono text-sm">{show.date}</td>
					<td class="font-medium">{show.artist}</td>
					<td>{show.venue}</td>
					<td>{show.city}</td>
					<td class="font-mono text-sm">{'★'.repeat(show.rating)}{'☆'.repeat(5 - show.rating)}</td>
					<td class="text-sm italic opacity-70 max-w-xs truncate">{show.notes}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
