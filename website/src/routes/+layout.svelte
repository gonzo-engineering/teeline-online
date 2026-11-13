<script lang="ts">
	import '#lib/styles/reset.css';
	import '#lib/styles/global.css';
	import Header from '#lib/components/layout/Header.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import type { Snippet } from 'svelte';
	import UserOptions from '#lib/components/UserOptions.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<meta name="keywords" content="Shorthand, Teeline, Journalism" />

	<meta property="og:site_name" content="teeline.online" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:image" content="https://teeline.online/images/teeline-online-social-card.webp" />
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
<div class="user-options-container">
	<UserOptions />
</div>

<style>
	main {
		width: 85vw;
		margin: auto;
	}
	.user-options-container {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 100%;
		background-color: var(--card-background);
		color: var(--card-foreground);
		padding: 0.5rem 0;
		box-shadow: 0px 0px 10px var(--shadow);
		line-height: 1;
	}
	@media (min-width: 768px) {
		.user-options-container {
			width: fit-content;
			height: fit-content;
			position: fixed;
			top: 0;
			right: 0;
			padding: 0.5rem 1rem;
			border-bottom-left-radius: 0.5rem;
		}
	}
</style>
