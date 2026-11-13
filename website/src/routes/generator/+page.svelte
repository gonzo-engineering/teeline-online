<script lang="ts">
	import ShorthandPassage from '#lib/components/ShorthandPassage.svelte';
	import Toggle from '#lib/components/Toggle.svelte';

	const placeholder = 'Write here and be amazed';

	let inputText = $state('');
	let textForPassage = $derived(inputText.replace(/\s+/g, ' ').trim());
	let showMeanings = $state(false);
</script>

<svelte:head>
	<title>Generator | teeline.online</title>
	<meta
		name="description"
		content="Type words and watch them turn into Teeline shorthand outlines before your very eyes."
	/>
</svelte:head>

<div class="container">
	<div class="input-and-settings">
		<input
			class="generator-input"
			type="text"
			bind:value={inputText}
			{placeholder}
			aria-label="Text to convert to Teeline"
			autocomplete="off"
			spellcheck="false"
		/>
		<Toggle toggleFunction={() => (showMeanings = !showMeanings)} toggleLabel="Show meanings" />
	</div>
	<div class:example={!textForPassage}>
		<ShorthandPassage text={textForPassage || placeholder} {showMeanings} />
	</div>
	<div style="text-align: center;">
		<p>This feature is a work in progress so take results with a grain of salt.</p>
	</div>
</div>

<style>
	.container {
		width: 100%;
		margin: 0 auto;
		padding-top: 2rem;
	}
	.input-and-settings {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 2rem;
		gap: 1rem;
	}
	.generator-input {
		padding: 1rem 2rem;
		border: 1px solid #e1e1e1;
		border-radius: 2rem;
		font: inherit;
		font-size: 1.6rem;
		color: inherit;
		background: transparent;
		min-width: 300px;
		field-sizing: content;
		max-width: 100%;
	}
	.example {
		opacity: 0.4;
	}
	@media (min-width: 768px) {
		.input-and-settings {
			flex-direction: row;
		}
	}
</style>