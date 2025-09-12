import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MwsMedicalOrderComponent } from './mws-medical-order.component';

describe('MwsMedicalOrderComponent', () => {
	let component: MwsMedicalOrderComponent;
	let fixture: ComponentFixture<MwsMedicalOrderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MwsMedicalOrderComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MwsMedicalOrderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
