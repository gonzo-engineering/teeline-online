<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import allOutlines from '../../data/outlines.json';
	import FlippingOutlineCard from '../../lib/cards/OutlineCardFlipping.svelte';
	import Container from '../../lib/outlineSVGs/OutlineSVG.svelte';
	import Lines from '../../lib/outlineSVGs/Lines.svelte';
	import Toggle from '../../lib/Toggle.svelte';
	import { prettify, shuffleOutlines } from '../../scripts/helpers';

	const shuffledSpecialOutlines: OutlineObject[] = shuffleOutlines(
		allOutlines.filter((outline) => outline.specialOutlineMeanings.length > 0)
	);

	let counter = 0;
	let outlineObject = shuffledSpecialOutlines[counter];
	let outlineFirst = false;

	const changeOutline = () => {
		counter === allOutlines.length - 1 ? (counter = 0) : counter++;
		outlineObject = shuffledSpecialOutlines[counter];
	};

	const handleKeydown = (event: { keyCode: number }) => {
		event.keyCode === 32 ? changeOutline() : null;
	};

	const toggleCardOrientation = () => (outlineFirst = !outlineFirst);
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
		{#key outlineObject}
			<FlippingOutlineCard flipped={outlineFirst}>
				<div slot="front">
					{prettify(outlineObject.specialOutlineMeanings)}
				</div>
				<div slot="back" style="width: 60%;">
					<Container {outlineObject} let:line let:previousLinesLength>
						<Lines {line} {previousLinesLength} />
					</Container>
				</div>
			</FlippingOutlineCard>
		{/key}
	</div>

	<div class="button-container">
		<button class="button" on:click={changeOutline}>Next card...</button>
	</div>
</div>

<style>
	.content {
		padding: 0 0 20px 0;
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
