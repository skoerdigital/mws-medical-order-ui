import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MWS_MEDICAL_ORDER_SETTINGS } from './mws-medical-order.provider';

@Component({
	selector: 'mws-lib',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './mws-medical-order.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MwsMedicalOrderComponent {
	readonly title = inject(MWS_MEDICAL_ORDER_SETTINGS).title;
}
