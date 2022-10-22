<script>
	import { disemvowelBodyOfText } from '../../scripts/disemvowel';
	let textToDisemvowel = '';
</script>

<div class="disemvoweler-container">
	<h2>Disemvoweler</h2>
	<textarea bind:value={textToDisemvowel} />
	<p>{disemvowelBodyOfText(textToDisemvowel)}</p>
</div>

<style>
	.disemvoweler-container {
		background-color: beige;
		padding: 20px;
	}
	textarea {
		font-size: 2rem;
		width: 100%;
		height: 150px;
		border: none;
		border-radius: 5px;
	}
</style>
