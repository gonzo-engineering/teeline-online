<script lang="ts">
	import { disemvowelWord } from '$lib/scripts/disemvowel';
	import { randomIntFromInterval } from '$lib/scripts/helpers';
	let { word }: { word: string } = $props();
</script>

<div class="disemvoweler-container" style="transform: rotate({randomIntFromInterval(-1, 1)}deg);">
	<div class="container-content">
		{word}&nbsp;&nbsp; → &nbsp;&nbsp;{disemvowelWord(word)}
	</div>
</div>

<style>
	.disemvoweler-container {
		box-shadow: 0px 0px 10px 1px #e1e1e1;
		border-radius: 15px;
		margin: 50px auto;
		height: fit-content;
		width: fit-content;
	}
	.container-content {
		font-size: 1.8rem;
		padding: 50px;
		text-align: center;
	}
</style>
