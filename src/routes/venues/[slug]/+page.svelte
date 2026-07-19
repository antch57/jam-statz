<script>
	import { MapPin, Calendar, Music } from '@lucide/svelte';
	import BackLink from '$lib/components/BackLink.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import InfoCard from '$lib/components/InfoCard.svelte';
	import BannerCard from '$lib/components/BannerCard.svelte';
	import ShowList from '$lib/components/ShowList.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';

	let { data } = $props();
	let { venueName, city, attended, lastShow, nextShow } = $derived(data);
</script>

<BackLink href="/venues" label="Back to Venues" />

{#if venueName}
	<PageHeader title={venueName} subtitle={city} />

	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
		<InfoCard icon={MapPin} label="Location" value={city} />
		<InfoCard icon={Music} label="Shows Seen Here" value={attended.length} />
		<InfoCard icon={Calendar} label="Last Show" value={lastShow?.date || 'N/A'} subtext={lastShow?.artist} />
	</div>

	{#if nextShow}
		<div class="mb-8">
			<BannerCard
				label="Next Show Here"
				title={nextShow.artist}
				detail={nextShow.date}
			/>
		</div>
	{/if}

	<ShowList shows={attended} title="Shows at {venueName}" emptyText="No shows attended here yet." />
{:else}
	<EmptyState message="Venue not found." href="/venues" linkText="Back to Venues" />
{/if}
