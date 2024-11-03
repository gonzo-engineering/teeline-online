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
			return !isNaN(Number(letterGroupings[0])) ? 'Number' : 'Letter';
		} else {
			if (letterGroupings.every((group) => !isNaN(Number(group)))) {
				return `Number${letterGroupings.length > 1 ? 's' : ''}`;
			}
			return `Letter grouping${letterGroupings.length > 1 ? 's' : ''}`;
		}
	};
</script>

{#snippet details({ label, meaning }: { label: string; meaning: string })}
	<div class="outline-label">
		{label}
	</div>
	<div class="outline-meaning">
		{meaning}
	</div>
{/snippet}

{#if outlineObject.letterGroupings.length > 0}
	{@render details({
		label: makeLetterLabel(outlineObject.letterGroupings),
		meaning: prettify(outlineObject.letterGroupings)
	})}
{/if}
{#if outlineObject.specialOutlineMeanings.length > 0}
	{@render details({
		label: `Special meaning${outlineObject.specialOutlineMeanings.length > 1 ? 's' : ''}`,
		meaning: prettify(outlineObject.specialOutlineMeanings)
	})}
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
