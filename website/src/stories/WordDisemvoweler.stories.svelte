<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import WordDisemvoweler from '../lib/components/disemvoweler/WordDisemvoweler.svelte';

	const { Story } = defineMeta({
		title: 'Disemvowelment/Word Disemvoweler',
		component: WordDisemvoweler,
		tags: ['autodocs'],
		args: {
			word: 'bellow'
		}
	});
</script>

<Story name="Default" />
