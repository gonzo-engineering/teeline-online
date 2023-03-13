<script>
	import OutlineSvg from './OutlineSVG.svelte';
	import { prettify } from '../../scripts/helpers';

	export let outlineObject;
</script>

<div class="flip-card">
	<div class="flip-card-inner">
		<div class="flip-card-front">
			<div class="svg-container">
				<OutlineSvg {outlineObject} />
			</div>
		</div>
		<div class="flip-card-back">
			<div>{prettify(outlineObject.specialOutlineMeanings)}</div>
		</div>
	</div>
</div>

<style>
	.flip-card {
		background-color: transparent;
		aspect-ratio: 450 / 300;
		width: 450px;
		height: 300px;
		perspective: 1000px;
		margin: 5vw auto;
	}

	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}

	.flip-card:hover .flip-card-inner {
		transform: rotateY(180deg);
	}

	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
		box-shadow: 0px 0px 10px 1px #e1e1e1;
		border-radius: 10px;
		/* transform: perspective(1000px) rotateX(4deg) rotateY(-16deg) rotateZ(4deg); */
	}

	.flip-card-front {
		background-color: white;
		color: black;
		display: flex;
	}

	.flip-card-back {
		background-color: white;
		transform: rotateY(180deg);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.svg-container {
		width: 60%;
		margin: auto;
	}
</style>
