<script>
	import { outlines } from '../../data/outlines/outlines';
	import FlippingOutlineCard from '../../lib/cards/OutlineCardFlipping.svelte';
	import { shuffle } from '../../scripts/helpers';

	const shuffledOutlines = shuffle(outlines);

	let counter = 0;
	let outlineObject = shuffledOutlines[counter];

	function changeOutline() {
		if (counter === outlines.length - 1) counter = 0;
		else counter++;
		console.log(counter);
		outlineObject = shuffledOutlines[counter];
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

	<div class="flipcard-container">
		<FlippingOutlineCard {outlineObject} />
	</div>

	<div class="button-container">
		<button class="button" on:click={changeOutline}>New outline</button>
	</div>
</div>

<style>
	.content {
		padding: 20px 0;
	}

	p {
		text-align: center;
	}

	.button-container {
		text-align: center;
	}

	button {
		font-size: 2rem;
		border-radius: 10px;
		padding: 10px 20px;
	}

	.flipcard-container {
		width: 100%;
	}

	@media (min-width: 1025px) {
		.flipcard-container {
			width: 30%;
			margin: auto;
		}
	}
</style>
