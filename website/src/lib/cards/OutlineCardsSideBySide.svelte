<script lang="ts">
	import OutlineCardAnimated from './OutlineCardAnimated.svelte';

	export let leftOutline: string;
	export let rightOutline: string;
</script>

<div style="display: flex; gap: 5%; margin: 50px auto; justify-content: center;">
	<OutlineCardAnimated outlineOrWord={leftOutline} --width={'50%'} />
	<OutlineCardAnimated outlineOrWord={rightOutline} --width={'50%'} />
</div>
