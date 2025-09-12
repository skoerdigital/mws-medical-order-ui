import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlsUiNoDataComponent } from './no-data.component';

describe('SlsUiNoDataComponent', () => {
	let component: SlsUiNoDataComponent;
	let fixture: ComponentFixture<SlsUiNoDataComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SlsUiNoDataComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SlsUiNoDataComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
