<script lang="ts">
	import type { OutlineObject } from '$lib/data/interfaces/interfaces';
	import Container from '$lib/components/outlineSVGs/OutlineSVG.svelte';
	import OutlineDetails from './OutlineDetails.svelte';
	import { findOrCreateOutlineObject } from '$lib/scripts/outline-building/build-outline-objects';
	import { hydratedData } from '$lib/scripts/hydrate-outline-data';

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

	const randomRotationAngle = Math.random() * 4 - 2;
</script>

<div style="transform: rotate({randomRotationAngle}deg);">
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
		padding: 1rem 1rem 2rem 1rem;
		margin: 0 auto;
		max-width: 150px;
	}
	@media (min-width: 768px) {
		.card {
			max-width: 200px;
		}
	}
</style>
