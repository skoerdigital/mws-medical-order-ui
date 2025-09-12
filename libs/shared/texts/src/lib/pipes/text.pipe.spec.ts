import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { Component } from '@angular/core';

import { TEXTS } from '../providers';
import { SlsUiTextPipe } from './text.pipe';

@Component({
	template: `{{ 'testKey' | slsUiText }}`,
})
class TestComponent {}

describe('SlsUiTextPipe', () => {
	let spectator: Spectator<TestComponent>;
	const createComponent = createComponentFactory({
		component: TestComponent,
		imports: [SlsUiTextPipe],
		providers: [
			{
				provide: TEXTS,
				useValue: {
					testKey: 'Test Value',
				},
			},
		],
	});

	it('should transform text key to corresponding text value', () => {
		spectator = createComponent({
			props: {
				template: `{{ 'testKey' | slsUiText }}`,
			},
		});
		expect(spectator.element).toHaveText('Test Value');
	});

	it('should use default fallback if key is not found', () => {
		spectator = createComponent({
			props: {
				template: `{{ 'unknownKey' | slsUiText }}`,
			},
		});
		expect(spectator.element).toHaveText(
			'unknownKey (No value for this text key is provided)',
		);
	});

	it('should use provided fallback if key is not found', () => {
		spectator = createComponent({
			props: {
				template: `{{ 'unknownKey' | slsUiText:'Custom Fallback' }}`,
			},
		});
		expect(spectator.element).toHaveText('unknownKey (Custom Fallback)');
	});

	it('should return "No key provided" if no key is provided', () => {
		spectator = createComponent({
			props: {
				template: `{{ '' | slsUiText }}`,
			},
		});
		expect(spectator.element).toHaveText('No key provided');
	});

	it('should warn and use default fallback if TEXTS token is not provided', () => {
		const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
		spectator = createComponent({
			providers: [
				{
					provide: TEXTS,
					useValue: null,
				},
			],
		});
		expect(warnSpy).toHaveBeenCalledWith(
			'No texts token is found on injector, pipe will be using default fallback.',
		);
		expect(spectator.element).toHaveText(
			'testKey (No value for this text key is provided)',
		);
		warnSpy.mockRestore();
	});
});
