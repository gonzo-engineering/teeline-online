<script>
	import Basics from '../../learn-content/basics.md';
	import Alphabet from '../../learn-content/alphabet.svx';
	import Disemvowelment from '../../learn-content/disemvowelment.svx';
	import SilentAndDoubleLetters from '../../learn-content/silent-and-double-letters.svx';
	import ConnectingLetters from '../../learn-content/connecting-letters.svx';
	import Shortcuts from '../../learn-content/shortcuts.svx';
</script>

<svelte:head>
	<title>Learn | teeline.online</title>
</svelte:head>

<div class="copy-container">
	<div class="learn-menu">
		<ol>
			<li><a href="">The basics</a></li>
			<li><a href="">Alphabet</a></li>
			<li><a href="">Disemvowelment</a></li>
			<li><a href="">Silent and double letters</a></li>
			<li><a href="">Connecting letters</a></li>
			<li><a href="">Shortcuts</a></li>
		</ol>
	</div>

	<Basics />
	<Alphabet />
	<Disemvowelment />
	<SilentAndDoubleLetters />
	<ConnectingLetters />
	<Shortcuts />
</div>

<style>
	.copy-container {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 50px;
	}

	@media (min-width: 1025px) {
		.copy-container {
			width: 60%;
		}
	}
</style>
