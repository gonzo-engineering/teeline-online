<script>
	import { validate_each_keys } from 'svelte/internal';

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
	let key;
	let keyCode;

	function getRandomArbitrary(min, max) {
		return Math.ceil(Math.random() * (max - min) + min);
	}

	function changeOutline() {
		let randomNumber = getRandomArbitrary(0, outlines.length - 1);
		console.log(randomNumber);
		outline = outlines[randomNumber];
	}

	function handleKeydown(event) {
		if (event.keyCode === 32) {
			changeOutline();
		}
	}
</script>

<svelte:head>
	<title>Revise | teeline.online</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="content">
	<p>Hover/tap to see what the outline stands for</p>

	<FlippingOutlineCard {outline} />

	<div class="button-container">
		<button class="button" on:click={changeOutline}>New outline</button>
	</div>
</div>

<style>
	.content {
		padding: 30px 0;
	}

	p {
		text-align: center;
	}

	.button-container {
		text-align: center;
	}

	button {
		font-size: 2rem;
		/* box-shadow: 0px 0px 10px 1px #e1e1e1; */
		border-radius: 10px;
		padding: 10px 20px;
	}
</style>
