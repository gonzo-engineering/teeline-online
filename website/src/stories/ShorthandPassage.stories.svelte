<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ShorthandPassage from '../lib/components/ShorthandPassage.svelte';

	const { Story } = defineMeta({
		title: 'Passages/Shorthand passage',
		component: ShorthandPassage,
		tags: ['autodocs'],
		args: {
			text: 'the blue man ran home',
			showMeanings: true
		}
	});
</script>

<Story name="Default" />
