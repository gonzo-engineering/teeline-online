<script>
	import Basics from '../../learn-content/basics.svx';
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
