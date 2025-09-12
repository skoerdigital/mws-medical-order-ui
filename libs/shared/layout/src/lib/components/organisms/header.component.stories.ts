import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { SlsUiHeaderComponent } from './header.component';

const meta: Meta<SlsUiHeaderComponent> = {
	component: SlsUiHeaderComponent,
	title: 'SlsUiHeaderComponent',
};
export default meta;
type Story = StoryObj<SlsUiHeaderComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/header works!/gi)).toBeTruthy();
	},
};
