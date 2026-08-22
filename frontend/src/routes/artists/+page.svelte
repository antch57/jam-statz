<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Music } from '@lucide/svelte';

	let { data } = $props();
	let artists = $derived(data.items);
</script>

<PageHeader title="Artists" subtitle="All the jam bands you've tracked." />

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
	{#each artists as artist (artist.id)}
		<a href="/artists/{artist.id}" class="card p-5 transition hover:brightness-95 block no-underline">
			<div class="flex items-start gap-3">
				<div class="flex items-center justify-center size-10 rounded-lg preset-tonal-primary shrink-0">
					<Music class="size-5" />
				</div>
				<div class="min-w-0">
					<h2 class="font-bold text-lg truncate">{artist.name}</h2>
					<p class="text-sm opacity-60">{artist.genre}</p>
				</div>
			</div>
			<div class="mt-4 pt-3 border-t border-surface-200-800 flex items-center justify-between text-sm">
				<span class="font-semibold">{artist.showsAttended} shows</span>
				<span class="opacity-50">Last: {artist.lastShow}</span>
			</div>
		</a>
	{/each}
</div>
