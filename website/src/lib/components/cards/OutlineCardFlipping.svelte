<script lang="ts">
	import type { Snippet } from 'svelte';

	/** Whether to show the backside, when not hovered */
	let { flipped, front, back }: { flipped: boolean; front: string; back: Snippet } = $props();
</script>

<div class="flip-card" style="--extra:{flipped ? '-180deg' : '0deg'}">
	<div class="inner">
		<div class="front">
			{front}
		</div>
		<div class="back">
			{@render back()}
		</div>
	</div>
</div>

<style>
	.flip-card {
		background-color: transparent;
		aspect-ratio: 450 / 300;
		perspective: 1000px;
		margin: 5vw auto;
	}

	.inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
		transform: rotateY(calc(var(--extra)));
		font-size: 2.3rem;
	}

	.flip-card:hover .inner {
		transform: rotateY(calc(var(--extra) + 180deg));
	}

	.front,
	.back {
		position: absolute;
		width: 100%;
		height: 100%;

		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		margin: auto;

		background: var(--card-background);
		color: var(--card-foreground);
		box-shadow: 0px 0px 10px 1px var(--shadow);
		border-radius: 10px;

		backface-visibility: hidden;
	}

	.back {
		transform: rotateY(180deg);
	}
</style>
