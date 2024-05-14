import type { Meta, StoryObj } from '@storybook/svelte';
import PassageDisemvoweler from '$lib/disemvoweler/PassageDisemvoweler.svelte';

const meta: Meta<typeof PassageDisemvoweler> = {
	component: PassageDisemvoweler,
	title: 'Disemvowelment/Passage Disemvoweler',
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
