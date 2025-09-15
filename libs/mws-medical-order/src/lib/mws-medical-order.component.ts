import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SlsUiSelectComponent } from '@sls-ui/layout';

import { MWS_MEDICAL_ORDER_SETTINGS } from './mws-medical-order.provider';

@Component({
	selector: 'mws-lib',
	standalone: true,
	imports: [SlsUiSelectComponent],
	templateUrl: './mws-medical-order.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MwsMedicalOrderComponent {
	readonly title = inject(MWS_MEDICAL_ORDER_SETTINGS).title;

	control = new FormControl<string | null>(null);
}
