<script>
	import './layout.css';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import { page } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { Calendar, CircleUser, Clock, LayoutDashboard, Menu, Search, Users } from '@lucide/svelte';

	let { children } = $props();

	let sidebarOpen = $state(false);

	$effect(() => {
		sidebarOpen = false;
	});

	const links = [
		{ label: 'Dashboard', href: '/', icon: LayoutDashboard },
		{ label: 'Artists', href: '/artists', icon: Users },
		{ label: 'Shows', href: '/shows', icon: Calendar },
		{ label: 'History', href: '/history', icon: Clock },
	];

	function isActive(href) {
		return $page.url.pathname === href;
	}

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');

			registerSW({ immediate: true });
		}
	});
</script>

<svelte:head>
	{@html pwaInfo ? pwaInfo.webManifest.linkTag : ''}
	<meta name="theme-color" content="#6750a4" />
</svelte:head>

<div class="min-h-screen p-3 md:p-5 space-y-4">
	<!-- Sticky AppBar -->
	<div class="sticky top-3 z-50 card rounded-2xl shadow-sm border border-surface-300-700 overflow-hidden">
		<AppBar>
			<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
				<AppBar.Lead>
					<button
						type="button"
						class="btn-icon btn-icon-lg hover:preset-tonal md:hidden"
						onclick={() => (sidebarOpen = !sidebarOpen)}
					>
						<Menu />
					</button>
					<a href="/" class="btn-icon btn-icon-lg hidden md:inline-flex hover:preset-tonal">
						<LayoutDashboard class="size-5" />
					</a>
				</AppBar.Lead>
				<AppBar.Headline>
					<a href="/" class="text-2xl font-bold no-underline tracking-tight">jam-statz</a>
				</AppBar.Headline>
				<AppBar.Trail>
					<button type="button" class="btn-icon hover:preset-tonal"><Search class="size-6" /></button>
					<button type="button" class="btn-icon hover:preset-tonal"><CircleUser class="size-6" /></button>
				</AppBar.Trail>
			</AppBar.Toolbar>
		</AppBar>
	</div>

	<!-- Sidebar + Main grid -->
	<div class="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
		<!-- Mobile sidebar -->
		{#if sidebarOpen}
			<div
				class="fixed inset-0 z-40 bg-black/50 md:hidden"
				onclick={() => (sidebarOpen = false)}
				role="presentation"
			></div>
			<aside class="fixed left-0 top-0 z-50 h-full w-64 p-3 pt-20 md:hidden">
				<Navigation
					layout="sidebar"
					class="card rounded-2xl shadow-sm border border-surface-300-700 grid h-full grid-rows-[1fr_auto] gap-4 p-2"
				>
					<Navigation.Content>
						<Navigation.Group>
							<Navigation.Menu>
								{#each links as link (link.href)}
									{@const Icon = link.icon}
									<Navigation.TriggerAnchor
										href={link.href}
										aria-current={isActive(link.href) ? 'page' : undefined}
									>
										<Icon class="size-4" />
										<Navigation.TriggerText>{link.label}</Navigation.TriggerText>
									</Navigation.TriggerAnchor>
								{/each}
							</Navigation.Menu>
						</Navigation.Group>
					</Navigation.Content>
				</Navigation>
			</aside>
		{/if}

		<!-- Desktop sidebar -->
		<Navigation
			layout="sidebar"
			class="hidden md:grid card rounded-2xl shadow-sm border border-surface-300-700 grid-rows-[1fr_auto] gap-4 p-2"
		>
			<Navigation.Content>
				<Navigation.Group>
					<Navigation.Menu>
						{#each links as link (link.href)}
							{@const Icon = link.icon}
							<Navigation.TriggerAnchor
								href={link.href}
								aria-current={isActive(link.href) ? 'page' : undefined}
							>
								<Icon class="size-4" />
								<Navigation.TriggerText>{link.label}</Navigation.TriggerText>
							</Navigation.TriggerAnchor>
						{/each}
					</Navigation.Menu>
				</Navigation.Group>
			</Navigation.Content>
		</Navigation>

		<!-- Main Content -->
		<main class="card rounded-2xl shadow-sm border border-surface-300-700 p-6">
			{@render children()}
		</main>
	</div>

	<!-- Footer -->
	<footer class="card rounded-2xl shadow-sm border border-surface-300-700 py-4 text-center text-sm opacity-70">
		jam-statz &copy; 2026
	</footer>
</div>
