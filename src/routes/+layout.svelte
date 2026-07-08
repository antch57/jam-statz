<script>
  import { onMount } from 'svelte';
  import { pwaInfo } from 'virtual:pwa-info';

  let { children } = $props();

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

{@render children()}
