import type { Meta, StoryObj } from '@storybook/svelte';
import WordToOutline from '$lib/components/WordToOutline.svelte';

const meta: Meta<typeof WordToOutline> = {
	component: WordToOutline,
	title: 'Disemvowelment/Word to Outline',
	tags: ['autodocs'],
	argTypes: {
		word: {
			control: 'text',
			description: 'The word to convert into an outline.'
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		word: 'bellow'
	}
};
