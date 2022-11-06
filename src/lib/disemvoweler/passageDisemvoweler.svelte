<script>
	import { disemvowelBodyOfText } from '../../scripts/disemvowel';
	let textToDisemvowel = '';
</script>

<div class="disemvoweler-container">
	<h2>Disemvoweler 9000</h2>
	<p>
		Type in the box below and watch them, as if by magic, be trimmed of unnecessary vowels as well
		as silent and double letters
	</p>
	<textarea bind:value={textToDisemvowel} />
	<p class="output">{disemvowelBodyOfText(textToDisemvowel)}</p>
	<p>
		Disclaimer: This is a flawed tool and should be treated as such. It makes mistakes, but
		hopefully gets across the essentials of trimming fat in Teeline shorthand
	</p>
</div>

<style>
	.disemvoweler-container {
		background-color: beige;
		padding: 50px;
		text-align: center;
	}
	textarea {
		font-size: 2rem;
		width: 100%;
		height: 150px;
		border: none;
		border-radius: 5px;
		padding: 20px;
		box-sizing: border-box;
	}
	.output {
		background-color: white;
		padding: 20px;
	}
</style>
