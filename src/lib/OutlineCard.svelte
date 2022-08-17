<script>
	export let outline;
</script>

<div class="outline-container">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		width="100%"
		viewBox="0 0 750 750"
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
			d="M 80 1 C 279.658 0.6508 522.393 0.3254 650 1"
		/>
		{#each outline.lines as line, i}
			<path
				class="path"
				transform="translate({line.translateValues})"
				fill="none"
				stroke="#000000"
				stroke-width="10"
				stroke-linecap="round"
				stroke-linejoin="bevel"
				style="animation-delay: {i}s"
				d={line.path}
			/>
		{/each}
	</svg>
	<div class="outline-label">{outline.name.toString().replace(/,/g, ' / ')}</div>
</div>

<style>
	.outline-container {
		border-radius: 15px;
		box-shadow: 0px 0px 10px 1px #e1e1e1;
		border-radius: 10px;
		width: 100%;
		padding-bottom: 30px;
	}

	.outline-container:hover .path {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		animation: dash 2s linear forwards;
	}

	.outline-label {
		text-align: center;
		font-size: 1.9rem;
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
