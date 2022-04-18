<script>
	import StaticAlphabetTable from '../lib/StaticAlphabetTable.svelte';
	import AnimatedAlphabetTable from '../lib/AnimatedAlphabetTable.svelte';
</script>

<svelte:head>
	<title>Teeline Online</title>
</svelte:head>

<div class="copy-container">
	<p>
		Teeline is a form of shorthand that allows people - usually journalists - to write lots of words
		really quickly. It is accepted by <a href="https://www.nctj.com/"
			>National Council for the Training of Journalists</a
		> and remains a requirement for qualified reporters.
	</p>
	<p>This site is a resource for anyone wishing to learn and/or practice Teeline.</p>
	<!-- <h4>Teeline shorthand: the basics</h4>
	<p>
		The aim of the game is writing as little as possible while preserving the content of whatever is
		being transcribed. This means short 'letters' which join in all sorts of ways, and a process of
		disemvoweling.
	</p> -->
</div>

<style>
	.copy-container {
		width: 60%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 50px;
	}
</style>
