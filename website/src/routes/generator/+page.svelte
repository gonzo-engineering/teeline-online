<script lang="ts">
	import SpeedToggle from '$lib/SpeedToggle.svelte';
	import ShorthandPassage from '$lib/ShorthandPassage.svelte';

	let inputText = $state('');
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
			bind:value={inputText}
			type="text"
			class="search-input search-input-generator"
			placeholder="Generate outlines..."
		/>
	</div>
	<ShorthandPassage text={inputText.trim()} showMeanings={true} />
	<div style="width: 50%; margin: auto; text-align: center;">
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
	.search-input-generator {
		display: block;
	}
	@media (min-width: 768px) {
		.input-and-settings {
			flex-direction: row;
		}
	}
</style>
