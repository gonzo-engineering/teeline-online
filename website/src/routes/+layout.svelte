<script lang="ts">
	import '$lib/styles/global.css';
	import Header from '../lib/layout/Header.svelte';
	import Footer from '../lib/layout/Footer.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<meta charset="UTF-8" />

	<meta name="keywords" content="Shorthand, Teeline, Journalism" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@yagayagafred" />
	<meta name="twitter:title" content="teeline.online" />
	<meta name="twitter:description" content="A (short)handy site" />
	<meta name="twitter:image" content="https://teeline.online/teeline-online-social-card.webp" />
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

<style>
	main {
		width: 85vw;
		margin: auto;
	}
</style>
