<script lang="ts">
	import { createOutlineObject } from '../../lib/outlineSVGs/buildOutline';
	import { disemvowelWord } from '../../scripts/disemvowel';
	import OutlineCardAnimated from '$lib/cards/OutlineCardAnimated.svelte';

	const outlineObject = createOutlineObject(disemvowelWord('magic'), {
		singleOrMultiple: 'single'
	});
</script>

<div class="container">
	<OutlineCardAnimated {outlineObject} displayName={true} />
</div>

<style>
	.container {
		width: 500px;
		margin: 0 auto;
	}
</style>
