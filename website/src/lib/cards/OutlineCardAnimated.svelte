<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import Container from '../outlineSVGs/OutlineSVG.svelte';
	import Lines from '../outlineSVGs/Lines.svelte';
	import OutlineDetails from './OutlineDetails.svelte';
	import { findOrCreateOutlineObject } from '../../scripts/build-outline-objects';
	import { hydratedData } from '../../scripts/hydrate-outline-data';

	export let outlineOrWord: OutlineObject | string;
	export let displayName = true;

	const hydratedOutlines = hydratedData;

	const outlineObject =
		typeof outlineOrWord === 'string'
			? findOrCreateOutlineObject(outlineOrWord, hydratedOutlines)
			: outlineOrWord;
</script>

<div>
	<div class="card animation-container">
		<Container {outlineObject} let:line let:previousLinesLength>
			<Lines {line} {previousLinesLength} drawingSpeed={900} />
		</Container>
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
		max-width: 300px;
	}
</style>
