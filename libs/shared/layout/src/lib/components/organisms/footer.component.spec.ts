import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { LAYOUT_SETTINGS } from '../providers';
import { SlsUiFooterComponent } from './footer.component';

describe('SlsUiFooterComponent', () => {
	let spectator: Spectator<SlsUiFooterComponent>;
	const createComponent = createComponentFactory({
		component: SlsUiFooterComponent,
		providers: [
			{
				provide: LAYOUT_SETTINGS,
				useValue: {
					footer: {
						copyrightText: '© 2023 Your Company',
					},
				},
			},
		],
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should display the correct copyright text', () => {
		const footerElement = spectator.query('footer');
		expect(footerElement).toHaveText('© 2023 Your Company');
	});
});
