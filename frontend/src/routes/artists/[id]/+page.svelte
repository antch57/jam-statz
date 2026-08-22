<script>
	import { MapPin, Music, Calendar } from '@lucide/svelte';
	import BackLink from '$lib/components/BackLink.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import InfoCard from '$lib/components/InfoCard.svelte';
	import BannerCard from '$lib/components/BannerCard.svelte';
	import ShowList from '$lib/components/ShowList.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';

	let { data } = $props();
	let { artist, attended, lastShow, nextShow } = $derived(data);
</script>

<BackLink href="/artists" label="Back to Artists" />

{#if artist}
	<PageHeader title={artist.name} subtitle={artist.genre} />

	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
		<InfoCard icon={MapPin} label="Hometown" value={artist.hometown} />
		<InfoCard icon={Music} label="Shows Attended" value={artist.showsAttended} />
		<InfoCard icon={Calendar} label="Last Seen" value={lastShow?.date || 'N/A'} subtext={lastShow ? `${lastShow.venue}, ${lastShow.city}` : null} />
	</div>

	{#if nextShow}
		<div class="mb-8">
			<BannerCard
				label="Next Show"
				title={nextShow.date}
				detail="{nextShow.venue}, {nextShow.city}"
			/>
		</div>
	{/if}

	<ShowList shows={attended} emptyText="No shows attended yet." />
{:else}
	<EmptyState message="Artist not found." href="/artists" linkText="Back to Artists" />
{/if}
