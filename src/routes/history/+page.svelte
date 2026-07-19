<script>
	import { shows } from '$lib/data/shows.js';
	import PageHeader from '$lib/components/PageHeader.svelte';

	const attended = shows.filter((s) => s.attended);
	const sorted = [...attended].sort((a, b) => new Date(b.date) - new Date(a.date));
</script>

<PageHeader title="History" subtitle="Every show you've ever caught." />

<div class="card overflow-hidden">
	<div class="table-wrap">
		<table class="table">
			<thead>
				<tr>
					<th>Date</th>
					<th>Artist</th>
					<th>Venue</th>
					<th>City</th>
					<th>Notes</th>
				</tr>
			</thead>
			<tbody>
				{#each sorted as show (show.id)}
					<tr>
						<td class="whitespace-nowrap font-mono text-sm opacity-70">{show.date}</td>
						<td class="font-medium">{show.artist}</td>
						<td>{show.venue}</td>
						<td>{show.city}</td>
						<td class="text-sm italic opacity-60 max-w-xs truncate">{show.notes}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
