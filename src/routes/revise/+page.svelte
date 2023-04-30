<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import outlines from '../../data/outlines.json';
	import FlippingOutlineCard from '../../lib/cards/OutlineCardFlipping.svelte';
	import Toggle from '../../lib/toggle.svelte';
	import { shuffle } from '../../scripts/helpers';

	const shuffledOutlines: OutlineObject[] = shuffle(outlines);

	let counter = 0;
	let outlineObject = shuffledOutlines[counter];
	let outlineFirst = false;

	const changeOutline = () => {
		if (counter === outlines.length - 1) counter = 0;
		else counter++;
		console.log(counter);
		outlineObject = shuffledOutlines[counter];
	};

	const handleKeydown = (event) => {
		if (event.keyCode === 32) {
			changeOutline();
		}
	};

	const toggleCardOrientation = () => {
		outlineFirst = !outlineFirst;
	};
</script>

<svelte:head>
	<title>Revise | teeline.online</title>
	<meta
		name="description"
		content="Work your way through hundreds of virtual flash cards to sear Teeline shorthand outlines into your brain and get your speed closer to the sacred 100wpm."
	/>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="content">
	<div class="info-container">
		<p>Hover over / tap on the flash card to see what it stands for</p>
		<Toggle toggleLabel={`Show outlines first`} toggleFunction={toggleCardOrientation} />
	</div>

	<div class="flipcard-container">
		<FlippingOutlineCard {outlineObject} {outlineFirst} />
	</div>

	<div class="button-container">
		<button class="button" on:click={changeOutline}>Next card...</button>
	</div>
</div>

<style>
	.content {
		padding: 20px 0;
	}

	.info-container {
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
