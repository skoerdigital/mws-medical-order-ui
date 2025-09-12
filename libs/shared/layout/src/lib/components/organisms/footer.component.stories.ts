import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { SlsUiFooterComponent } from './footer.component';

const meta: Meta<SlsUiFooterComponent> = {
	component: SlsUiFooterComponent,
	title: 'SlsUiFooterComponent',
};
export default meta;
type Story = StoryObj<SlsUiFooterComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/footer works!/gi)).toBeTruthy();
	},
};
