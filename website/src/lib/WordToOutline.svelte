<script lang="ts">
	import WordDisemvoweler from './disemvoweler/WordDisemvoweler.svelte';
	import OutlineCardAnimated from './cards/OutlineCardAnimated.svelte';

	let { word }: { word: string } = $props();
</script>

<div class="word-converter-container">
	<div>
		<WordDisemvoweler {word} />
	</div>
	<div>
		<OutlineCardAnimated outlineOrWord={word} displayName={false} />
	</div>
</div>

<style>
	.word-converter-container {
		display: flex;
		flex-direction: row;
		width: 100%;
		column-gap: 3rem;
		align-items: center;
		justify-content: center;
		margin: 0 auto 2rem auto;
	}
</style>
