<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import OutlineCardGrid from '../lib/components/cards/OutlineCardGrid.svelte';

	const { Story } = defineMeta({
		title: 'Cards/Outline Card Grid',
		component: OutlineCardGrid,
		tags: ['autodocs'],
		args: {
			wordsAndPhrases: [
				'it is my pleasure',
				'hospital',
				'blue',
				'bellow',
				'7',
				'ladies and gentlemen'
			]
		}
	});
</script>

<Story name="Default" />
