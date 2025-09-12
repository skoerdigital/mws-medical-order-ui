import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlsUiErrorDataComponent } from './error-data.component';

describe('ErrorDataComponent', () => {
	let component: SlsUiErrorDataComponent;
	let fixture: ComponentFixture<SlsUiErrorDataComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SlsUiErrorDataComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SlsUiErrorDataComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
