<script>
	import { alphabet } from '../data/outlines/alphabet';
</script>

<div class="animated-container">
	{#each alphabet as letter}
		<div class="outline-container">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				width="100pt"
				height="100pt"
				viewBox="0 0 720 720"
			>
				<defs />
				<path
					id="shape0"
					transform="translate(0, 458.461538461538)"
					fill="#D3D3D3"
					fill-rule="evenodd"
					stroke="#D3D3D3"
					stroke-width="5"
					stroke-linecap="square"
					stroke-linejoin="miter"
					stroke-miterlimit="2"
					d="M 159 1 C 279.658 0.6508 522.393 0.3254 493 1"
				/>
				{#each letter.lines as line}
					<path
						class="path"
						transform="translate({line.translateValues})"
						fill="none"
						stroke="#000000"
						stroke-width="13"
						stroke-linecap="round"
						stroke-linejoin="bevel"
						d={line.path}
					/>
				{/each}
			</svg>
			<div class="outline-label">{letter.name}</div>
		</div>
	{/each}
</div>

<style>
	.animated-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 70px;
	}

	.outline-container {
		padding: 0 20px 40px 20px;
		border-radius: 15px;
		box-shadow: 0px 0px 10px 3px #e1e1e1;
		border-radius: 10px;
	}

	.outline-container:hover .path {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		animation: dash 2s linear infinite;
	}

	.outline-label {
		text-align: center;
	}

	@keyframes dash {
		from {
			stroke-dashoffset: 1100;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
