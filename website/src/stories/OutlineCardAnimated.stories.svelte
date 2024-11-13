<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import OutlineCardAnimated from '../lib/components/cards/OutlineCardAnimated.svelte';

	const { Story } = defineMeta({
		title: 'Cards/Animated Outline Card',
		component: OutlineCardAnimated,
		tags: ['autodocs'],
		args: {
			outlineOrWord: 'it is my pleasure',
			displayName: true
		}
	});
</script>

<Story name="Default" />
