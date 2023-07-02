<script lang="ts">
	import type { OutlineObject } from '../../data/interfaces/interfaces';
	import OutlineCardAnimated from './OutlineCardAnimated.svelte';

	export let leftOutline: OutlineObject;
	export let rightOutline: OutlineObject;
</script>

<div style="display: flex; gap: 5%; margin: 50px auto;">
	<OutlineCardAnimated outlineObject={leftOutline} --width={'50%'} />
	<OutlineCardAnimated outlineObject={rightOutline} --width={'50%'} />
</div>
