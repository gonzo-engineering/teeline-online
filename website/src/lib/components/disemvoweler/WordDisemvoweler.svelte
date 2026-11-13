<script lang="ts">
	import { disemvowelWord } from '#lib/scripts/disemvowel.ts';
	import { randomIntFromInterval } from '#lib/scripts/helpers.ts';
	let { word }: { word: string } = $props();
</script>

<div class="disemvoweler-container" style="transform: rotate({randomIntFromInterval(-1, 1)}deg);">
	<div class="container-content">
		{word}&nbsp;&nbsp; → &nbsp;&nbsp;{disemvowelWord(word)}
	</div>
</div>

<style>
	.disemvoweler-container {
		background: var(--card-background);
		box-shadow: 0px 0px 10px 1px var(--shadow);
		border-radius: 15px;
		margin: 50px auto;
		height: fit-content;
		width: fit-content;
		font-family: 'Handwriting', sans-serif;
	}
	.container-content {
		font-size: 1.8rem;
		padding: 50px;
		text-align: center;
	}
</style>
