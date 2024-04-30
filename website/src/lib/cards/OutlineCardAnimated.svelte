<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import Container from '../outlineSVGs/OutlineSVG.svelte';
	import OutlineDetails from './OutlineDetails.svelte';
	import { findOrCreateOutlineObject } from '../../scripts/build-outline-objects';
	import { hydratedData } from '../../scripts/hydrate-outline-data';

	let {
		outlineOrWord,
		displayName = true
	}: {
		outlineOrWord: OutlineObject | string;
		displayName?: boolean;
	} = $props();

	const outlineObject =
		typeof outlineOrWord === 'string'
			? findOrCreateOutlineObject(outlineOrWord, hydratedData)
			: outlineOrWord;
</script>

<div>
	<div class="card animation-container">
		<Container {outlineObject} drawingSpeed={900} />
		{#if displayName}
			<OutlineDetails {outlineObject} />
		{/if}
	</div>
</div>

<style>
	.card {
		box-shadow: 0px 0px 10px 1px #e1e1e1;
		border-radius: 10px;
		width: var(--width);
		padding: 10% 10% 20% 10%;
		margin: 0 auto;
		max-width: 200px;
	}
</style>
