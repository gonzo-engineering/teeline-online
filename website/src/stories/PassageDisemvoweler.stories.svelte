<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PassageDisemvoweler from '../lib/components/disemvoweler/PassageDisemvoweler.svelte';

	const { Story } = defineMeta({
		title: 'Disemvowelment/Passage Disemvoweler',
		component: PassageDisemvoweler,
		tags: ['autodocs']
	});
</script>

<Story name="Default" />
