<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import WordToOutline from '../lib/components/WordToOutline.svelte';

	const { Story } = defineMeta({
		title: 'Disemvowelment/Word to Outline',
		component: WordToOutline,
		tags: ['autodocs'],
		args: {
			word: 'bellow'
		}
	});
</script>

<Story name="Default" />
