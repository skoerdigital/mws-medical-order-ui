import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { SlsUiHeaderComponent } from './header.component';

describe('SlsUiHeaderComponent', () => {
	let spectator: Spectator<SlsUiHeaderComponent>;
	const createComponent = createComponentFactory(SlsUiHeaderComponent);

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create', () => {
		expect(spectator.component).toBeTruthy();
	});
});
