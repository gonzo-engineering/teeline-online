import type { Meta, StoryObj } from '@storybook/svelte';
import WordDisemvoweler from '$lib/disemvoweler/WordDisemvoweler.svelte';

const meta: Meta<typeof WordDisemvoweler> = {
	component: WordDisemvoweler,
	title: 'Disemvowelment/Word Disemvoweler',
	tags: ['autodocs'],
	argTypes: {
		word: {
			control: 'text',
			description: 'The word to disemvowel.'
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
