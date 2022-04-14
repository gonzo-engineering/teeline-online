<script>
	const letters = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z'
	];
</script>

<div class="alphabet-container">
	{#each letters as letter}
		<div class="card-container">
			<div class="outline-container">
				<img
					class="outline-base"
					src="/outlines/other/line-base.svg"
					alt="A horizontal gray line"
				/>
				<img
					class="outline"
					src="/outlines/alphabet/{letter}.svg"
					alt="Teeline shorthand outline of the letter '{letter}'"
				/>
			</div>
			<p class="label">{letter}</p>
		</div>
	{/each}
</div>

<style>
	.alphabet-container {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-column-gap: 30px;
		grid-row-gap: 30px;
	}

	.card-container {
		box-shadow: 0px 0px 15px 5px #e1e1e1;
		border-radius: 10px;
	}

	.outline-container {
		height: 200px;
		width: 200px;
		text-align: center;
	}

	.label {
		text-align: center;
		margin: 10px 0 40px 0;
	}

	.outline,
	.outline-base {
		position: absolute;
		height: 200px;
		width: 200px;
		margin: 10px;
		display: block;
	}

	.outline {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		animation: dash 5s linear forwards;
	}
</style>
