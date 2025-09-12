import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { SlsUiSidemenuComponent } from './sidemenu.component';

const meta: Meta<SlsUiSidemenuComponent> = {
	component: SlsUiSidemenuComponent,
	title: 'SlsUiSidemenuComponent',
};
export default meta;
type Story = StoryObj<SlsUiSidemenuComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/sidemenu works!/gi)).toBeTruthy();
	},
};
