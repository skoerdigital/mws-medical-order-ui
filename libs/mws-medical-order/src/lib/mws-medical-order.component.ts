import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'mws-lib',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './mws-medical-order.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MwsMedicalOrderComponent {}
