<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import OutlineSvg from './OutlineSVG.svelte';
	import { prettify } from '../../scripts/helpers';

	export let outlineObject: OutlineObject;
	export let displayName = true;
</script>

<div class="outline-container">
	<div class="outline-content">
		<OutlineSvg {outlineObject} class="path" />
		{#if displayName && outlineObject.specialOutlineMeanings}
			<div class="outline-label">{prettify(outlineObject.specialOutlineMeanings)}</div>
		{/if}
		{#if displayName && !outlineObject.specialOutlineMeanings && outlineObject.letterGroupings}
			<div class="outline-label">{prettify(outlineObject.letterGroupings)}</div>
		{/if}
	</div>
</div>

<style>
	.outline-container {
		box-shadow: 0px 0px 10px 1px #e1e1e1;
		border-radius: 10px;
		width: var(--width);
		max-width: 200px;
		padding-bottom: 30px;
		margin: 0 auto;
	}

	.outline-container:hover :global(.path) {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		animation: dash 2s linear forwards;
	}

	.outline-label {
		text-align: center;
		font-size: 1.9rem;
	}

	.outline-content {
		padding: 20px;
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
