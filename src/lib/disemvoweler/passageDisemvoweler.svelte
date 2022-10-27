<script>
	import { disemvowelBodyOfText } from '../../scripts/disemvowel';
	let textToDisemvowel = '';
</script>

<div class="disemvoweler-container">
	<h2>Disemvoweler 9000</h2>
	<p>
		Disclaimer: This is a flawed tool and should be treated as such. It makes mistakes, but
		hopefully gets across the essentials of trimming fat in Teeline shorthand
	</p>
	<p>
		Type in the box below and watch them, as if by magic, be trimmed of unnecessary vowels as well
		as silent and double letters
	</p>
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
