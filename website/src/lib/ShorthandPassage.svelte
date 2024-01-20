<script lang="ts">
	import Container from './outlineSVGs/OutlineSVG.svelte';
	import Lines from './outlineSVGs/Lines.svelte';
	import { createOutlineObjects } from '../scripts/build-outline-objects';
	import OutlineDetails from './cards/OutlineDetails.svelte';

	export let text: string;
	$: outlineObjects = createOutlineObjects(text);
</script>

<div style="display: flex; flex-wrap: wrap; gap: 0; margin: 50px auto; justify-content: center;">
	{#each outlineObjects as outlineObject}
		<div class="animation-container">
			<Container {outlineObject} let:line let:previousLinesLength>
				<Lines {line} {previousLinesLength} drawingSpeed={900} />
			</Container>
			<OutlineDetails {outlineObject} />
		</div>
	{/each}
</div>
