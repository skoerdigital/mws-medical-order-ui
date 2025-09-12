import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { LAYOUT_SETTINGS } from '../providers';
import { SlsUiSidemenuComponent } from './sidemenu.component';

describe('SlsUiSidemenuComponent', () => {
	let spectator: Spectator<SlsUiSidemenuComponent>;
	const createComponent = createComponentFactory({
		component: SlsUiSidemenuComponent,
		imports: [CommonModule, RouterTestingModule],
		providers: [
			{
				provide: LAYOUT_SETTINGS,
				useValue: {
					sidemenu: {
						items: [
							{ label: 'Home', link: '/' },
							{ label: 'About', link: '/about' },
						],
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

	it('should have the correct number of menu items', () => {
		expect(spectator.component.menuItems.length).toBe(2);
	});

	it('should display the correct menu item labels', () => {
		const menuItems = spectator.queryAll('li');
		expect(menuItems.length).toBe(2);
		expect(menuItems[0].textContent).toContain('Home');
		expect(menuItems[1].textContent).toContain('About');
	});
});
