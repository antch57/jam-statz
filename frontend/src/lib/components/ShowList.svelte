<script>
	import ShowCard from './ShowCard.svelte';

	let { shows, title = 'Show History', emptyText = 'No shows yet.' } = $props();
	let showCount = $state(5);

	let visibleShows = $derived(shows.slice(0, showCount));
	let hasMore = $derived(showCount < shows.length);
</script>

<div>
	<h2 class="h2 mb-4">{title}</h2>
	{#if shows.length > 0}
		<div class="space-y-3">
			{#each visibleShows as show}
				<ShowCard {show} />
			{/each}
		</div>
		{#if hasMore}
			<button
				type="button"
				class="btn preset-tonal mt-4"
				onclick={() => (showCount += 5)}
			>
				Show More ({shows.length - showCount} remaining)
			</button>
		{/if}
	{:else}
		<p class="opacity-50">{emptyText}</p>
	{/if}
</div>
