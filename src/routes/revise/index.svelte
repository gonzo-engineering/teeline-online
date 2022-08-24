<script>
	import { outlines } from '../../data/outlines/outlines';
	import FlippingOutlineCard from '../../lib/cards/FlippingOutlineCard.svelte';

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	shuffleArray(outlines);

	let outline = outlines[0];
</script>

<svelte:head>
	<title>Revise | teeline.online</title>
</svelte:head>

<div class="content">
	<p>What does this outline stand for? Hover/tap to see the answer</p>

	<FlippingOutlineCard {outline} />

	<p>Refresh for a new card (smarter system coming soon)</p>
</div>

<style>
	.content {
		padding: 30px 0;
	}

	p {
		text-align: center;
	}
</style>
