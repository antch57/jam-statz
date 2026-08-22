<script>
	import { Clock, MapPin, Calendar, Music } from '@lucide/svelte';
	import BackLink from '$lib/components/BackLink.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import InfoCard from '$lib/components/InfoCard.svelte';
	import Setlist from '$lib/components/Setlist.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';

	let { data } = $props();
	let show = $derived(data.show);
</script>

<BackLink href="/shows" label="Back to Shows" />

{#if show}
	<PageHeader title={show.artist} subtitle={show.date} />

	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
		<InfoCard icon={MapPin} label="Venue" value={show.venue} subtext={show.city} />
		<InfoCard icon={Calendar} label="Date" value={show.date} />
		<InfoCard icon={Clock} label="Duration" value={show.duration || 'TBD'} />
	</div>

	{#if show.setlist}
		<h2 class="h2 mb-4 flex items-center gap-2">
			<Music class="size-6" /> Setlist
		</h2>
		<Setlist setlist={show.setlist} />
	{/if}

	{#if show.notes}
		<div class="mt-8">
			<h2 class="h2 mb-4">Notes</h2>
			<div class="card p-5">
				<p>{show.notes}</p>
			</div>
		</div>
	{/if}
{:else}
	<EmptyState message="Show not found." href="/shows" linkText="Back to Shows" />
{/if}
