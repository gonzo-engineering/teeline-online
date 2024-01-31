<script lang="ts">
	import WordDisemvoweler from './disemvoweler/WordDisemvoweler.svelte';
	import OutlineCardAnimated from './cards/OutlineCardAnimated.svelte';

	export let word: string;
</script>

<div class="word-converter-container">
	<div>
		<WordDisemvoweler {word} />
	</div>
	<div>
		<OutlineCardAnimated outlineOrWord={word} displayName={false} --width={'100%'} />
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
		margin: 5rem auto;
	}
</style>
