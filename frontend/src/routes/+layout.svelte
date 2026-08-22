<script>
	import './layout.css';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import { page } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { Calendar, CircleUser, LayoutDashboard, MapPin, Menu, Moon, Search, Sun, Users } from '@lucide/svelte';

	let { children } = $props();

	let sidebarOpen = $state(false);
	let mode = $state('light');

	$effect(() => {
		$page.url.pathname;
		sidebarOpen = false;
	});

	$effect(() => {
		mode = localStorage.getItem('mode') || 'light';
	});

	function toggleMode() {
		const next = mode === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-mode', next);
		localStorage.setItem('mode', next);
		mode = next;
	}

	const links = [
		{ label: 'Dashboard', href: '/', icon: LayoutDashboard },
		{ label: 'Artists', href: '/artists', icon: Users },
		{ label: 'Shows', href: '/shows', icon: Calendar },
		{ label: 'Venues', href: '/venues', icon: MapPin },
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
	<meta name="theme-color" content={mode === 'dark' ? '#2c1e3d' : '#8b5cf6'} />
</svelte:head>

<div class="h-screen grid grid-rows-[auto_1fr_auto] p-3 md:p-5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:pb-[calc(1.25rem+env(safe-area-inset-bottom))] gap-4">
	<!-- Mobile sidebar overlay -->
	{#if sidebarOpen}
		<div
			class="fixed inset-0 z-40 bg-black/50 md:hidden"
			onclick={() => (sidebarOpen = false)}
			role="presentation"
		></div>
		<aside class="fixed left-0 top-0 z-50 h-full w-64 p-3 pt-20 md:hidden">
			<Navigation
				layout="sidebar"
				class="card rounded-2xl shadow-sm border border-surface-300-700 grid h-full grid-rows-[1fr_auto] gap-4 p-2 bg-surface-100-900"
			>
				<Navigation.Content>
					<Navigation.Group>
						<Navigation.Menu>
							{#each links as link (link.href)}
								{@const Icon = link.icon}
						<Navigation.TriggerAnchor
							href={link.href}
							aria-current={isActive(link.href) ? 'page' : undefined}
							class={isActive(link.href) ? 'preset-tonal-primary' : ''}
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

	<!-- Header -->
	<div class="card rounded-2xl shadow-sm border border-surface-300-700 overflow-hidden">
		<AppBar class="bg-surface-100-900">
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
				<AppBar.Trail class="gap-1">
					<button type="button" class="btn-icon hover:preset-tonal"><Search class="size-6" /></button>
					<button type="button" class="btn-icon hover:preset-tonal" onclick={toggleMode}>
						{#if mode === 'dark'}
							<Sun class="size-6" />
						{:else}
							<Moon class="size-6" />
						{/if}
					</button>
					<button type="button" class="btn-icon hover:preset-tonal"><CircleUser class="size-6" /></button>
				</AppBar.Trail>
			</AppBar.Toolbar>
		</AppBar>
	</div>

	<!-- Sidebar + Main -->
	<div class="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 overflow-hidden min-h-0">
		<!-- Desktop sidebar -->
		<Navigation
			layout="sidebar"
			class="hidden md:grid card rounded-2xl shadow-sm border border-surface-300-700 grid-rows-[1fr_auto] gap-4 p-2 bg-surface-100-900 overflow-y-auto"
		>
			<Navigation.Content>
				<Navigation.Group>
					<Navigation.Menu>
						{#each links as link (link.href)}
							{@const Icon = link.icon}
						<Navigation.TriggerAnchor
							href={link.href}
							aria-current={isActive(link.href) ? 'page' : undefined}
							class={isActive(link.href) ? 'preset-tonal-primary' : ''}
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
	<main class="card rounded-2xl shadow-sm border border-surface-300-700 p-4 md:p-6 overflow-y-auto">
		{@render children()}
	</main>
</div>

<!-- Footer -->
<footer class="text-center text-xs opacity-40 py-2">
	jam-statz &copy; 2026
</footer>
</div>
