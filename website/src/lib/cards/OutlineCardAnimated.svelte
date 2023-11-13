<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import OutlineSvg from './OutlineSVG.svelte';
	import { prettify } from '../../scripts/helpers';

	export let outlineObject: OutlineObject;
	export let displayName = true;

	let drawingSpeed = 900;

	const makeLetterLabel = (letterGroupings: string[]) => {
		if (letterGroupings.length === 1 && letterGroupings[0].length === 1) {
			return `Letter`;
		} else {
			return `Letter grouping${letterGroupings.length > 1 ? 's' : ''}`;
		}
	};
</script>

<div class="outline-container">
	<div class="outline-content">
		<OutlineSvg {outlineObject} {drawingSpeed} />
		{#if displayName && outlineObject.letterGroupings.length > 0}
			<div class="outline-label">
				{makeLetterLabel(outlineObject.letterGroupings)}
			</div>
			<div class="outline-meaning">
				{prettify(outlineObject.letterGroupings)}
			</div>
		{/if}
		{#if displayName && outlineObject.specialOutlineMeanings.length > 0}
			<div class="outline-label">
				Special meaning{outlineObject.specialOutlineMeanings.length > 1 ? 's' : ''}
			</div>
			<div class="outline-meaning">
				{prettify(outlineObject.specialOutlineMeanings)}
			</div>
		{/if}
	</div>
</div>

<style>
	.outline-container {
		box-shadow: 0px 0px 10px 1px #e1e1e1;
		border-radius: 10px;
		width: var(--width);
		padding-bottom: 30px;
		margin: 0 auto;
	}

	.outline-label {
		text-align: center;
		font-size: 1.2rem;
		margin: 0 0 0.5rem 0;
	}

	.outline-meaning {
		text-align: center;
		font-size: 1.9rem;
		margin: 0 0 1rem 0;
		font-weight: bold;
		line-height: 0.9;
	}

	.outline-content {
		padding: 20px;
	}
</style>
