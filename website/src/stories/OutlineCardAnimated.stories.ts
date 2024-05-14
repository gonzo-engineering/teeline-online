import type { Meta, StoryObj } from '@storybook/svelte';
import OutlineCardAnimated from '$lib/cards/OutlineCardAnimated.svelte';

const meta: Meta<typeof OutlineCardAnimated> = {
	component: OutlineCardAnimated,
	title: 'Cards/Animated Outline Card',
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		outlineOrWord: 'ladies and gentlemen',
		displayName: true
	}
};
