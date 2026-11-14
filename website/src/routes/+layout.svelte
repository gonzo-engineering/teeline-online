<script lang="ts">
	import '#lib/styles/reset.css';
	import '#lib/styles/global.css';
	import Header from '#lib/components/layout/Header.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import type { Snippet } from 'svelte';
	import UserOptionsMenu from '#lib/components/layout/UserOptionsMenu.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<meta name="keywords" content="Shorthand, Teeline, Journalism" />

	<meta property="og:site_name" content="teeline.online" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_GB" />
	<meta
		property="og:image"
		content="https://teeline.online/images/teeline-online-social-card.webp"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta
		property="og:image:alt"
		content="Screenshot of the teeline.online outlines page, showing a selection of Teeline shorthand outline cards."
	/>

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@yagayagafred" />
	<meta
		name="twitter:image:alt"
		content="Screenshot of the teeline.online outlines page, showing a selection of Teeline shorthand outline cards."
	/>

	<script
		data-goatcounter="https://teeline-online.goatcounter.com/count"
		async
		src="//gc.zgo.at/count.js"
	></script>
</svelte:head>

<Header />
<main>
	{@render children()}
</main>
<Footer />
<UserOptionsMenu />

<style>
	main {
		width: 90vw;
		margin: auto;
	}
</style>
