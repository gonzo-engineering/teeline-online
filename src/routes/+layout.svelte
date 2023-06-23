<script>
	import Header from '../lib/layout/Header.svelte';
	import Footer from '../lib/layout/Footer.svelte';
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

<body>
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</body>

<style>
	@font-face {
		font-family: 'Handwriting';
		font-style: normal;
		font-weight: 500;
		font-display: swap;
		src: url('/fonts/handwriting.otf'); /* IE9 Compat Modes */
		src: local(''), url('/fonts/handwriting.otf') format('embedded-opentype'),
			/* IE6-IE8 */ url('/fonts/handwriting.otf') format('woff2'),
			/* Super Modern Browsers */ url('/fonts/handwriting.otf') format('woff'),
			/* Modern Browsers */ url('/fonts/handwriting.otf') format('truetype'),
			/* Safari, Android, iOS */ url('/fonts/handwriting.otf') format('svg'); /* Legacy iOS */
	}

	body {
		width: 90%;
		margin: auto;
	}
</style>
