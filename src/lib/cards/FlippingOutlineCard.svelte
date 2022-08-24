<script>
	export let outline;
</script>

<div class="flip-card">
	<div class="flip-card-inner">
		<div class="flip-card-front">
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
		</div>
		<div class="flip-card-back">
			<div>{outline.name.toString().replace(/,/g, ' / ')}</div>
		</div>
	</div>
</div>

<style>
	/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
	.flip-card {
		background-color: transparent;
		width: 450px;
		height: 300px;
		perspective: 1000px; /* Remove this if you don't want the 3D effect */
		margin: 5vw auto;
	}

	/* This container is needed to position the front and back side */
	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}

	/* Do an horizontal flip when you move the mouse over the flip box container */
	.flip-card:hover .flip-card-inner {
		transform: rotateY(180deg);
	}

	/* Position the front and back side */
	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
		box-shadow: 0px 0px 10px 1px #e1e1e1;
		border-radius: 10px;
	}

	/* Style the front side (fallback if image is missing) */
	.flip-card-front {
		background-color: white;
		color: black;
	}

	/* Style the back side */
	.flip-card-back {
		background-color: white;
		transform: rotateY(180deg);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	svg {
		width: 60%;
	}
</style>
