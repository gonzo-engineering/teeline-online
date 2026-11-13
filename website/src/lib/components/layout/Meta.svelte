<script lang="ts">
	import { page } from '$app/state';

	const SITE_URL = 'https://teeline.online';

	let { title, description }: { title: string; description: string } = $props();

	const url = $derived(SITE_URL + page.url.pathname);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
</svelte:head>
