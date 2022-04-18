<script>
	import Header from '../lib/Header.svelte';
	import Footer from '../lib/Footer.svelte';
</script>

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
		src: url('/fonts/handwriting.otf'); /* IE9 Compat Modes */
		src: local(''), url('/fonts/handwriting.otf') format('embedded-opentype'),
			/* IE6-IE8 */ url('/fonts/handwriting.otf') format('woff2'),
			/* Super Modern Browsers */ url('/fonts/handwriting.otf') format('woff'),
			/* Modern Browsers */ url('/fonts/handwriting.otf') format('truetype'),
			/* Safari, Android, iOS */ url('/fonts/handwriting.otf') format('svg'); /* Legacy iOS */
	}

	body {
		margin: 0 100px 100px;
	}
</style>
