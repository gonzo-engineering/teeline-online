<script lang="ts">
	import { disemvowelBodyOfText } from '../../scripts/disemvowel';
	let textToDisemvowel = $state('');
	let disemvoweledText = $derived(disemvowelBodyOfText(textToDisemvowel));
</script>

<div class="disemvoweler-container">
	<h2>Disemvoweler 9000</h2>
	<p>
		Type words in the box below and watch them be trimmed - as if by magic - of unnecessary vowels
		as well as silent and double letters
	</p>
	<textarea bind:value={textToDisemvowel}></textarea>
	<img src="/images/arrow.svg" alt="An ink-drawn style arrow pointing down" />
	<p class="output">{disemvoweledText}</p>
	<p>
		Disclaimer: This is a flawed tool and should be treated as such. It makes mistakes, but
		hopefully gets across the essentials of trimming fat in Teeline shorthand
	</p>
</div>

<style>
	.disemvoweler-container {
		padding: 50px;
		text-align: center;
		box-shadow: 0px 0px 10px 1px #e1e1e1;
		border-radius: 30px;
		margin-bottom: 2rem;
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
		padding: 20px;
	}
	textarea,
	.output {
		border: dashed black 2px;
		border-radius: 10px;
		background-color: rgb(242, 242, 242);
	}
	img {
		transform: rotate(90deg);
		width: 30%;
		margin: auto;
	}
</style>
