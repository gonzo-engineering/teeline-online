<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import { prettify } from '../../scripts/helpers';

	let {
		outlineObject
	}: {
		outlineObject: OutlineObject;
	} = $props();

	const makeLetterLabel = (letterGroupings: string[]) => {
		if (letterGroupings.length === 1 && letterGroupings[0].length === 1) {
			return `Letter`;
		} else {
			return `Letter grouping${letterGroupings.length > 1 ? 's' : ''}`;
		}
	};
</script>

{#if outlineObject.letterGroupings.length > 0}
	<div class="outline-label">
		{makeLetterLabel(outlineObject.letterGroupings)}
	</div>
	<div class="outline-meaning">
		{prettify(outlineObject.letterGroupings)}
	</div>
{/if}
{#if outlineObject.specialOutlineMeanings.length > 0}
	<div class="outline-label">
		Special meaning{outlineObject.specialOutlineMeanings.length > 1 ? 's' : ''}
	</div>
	<div class="outline-meaning">
		{prettify(outlineObject.specialOutlineMeanings)}
	</div>
{/if}

<style>
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
</style>
