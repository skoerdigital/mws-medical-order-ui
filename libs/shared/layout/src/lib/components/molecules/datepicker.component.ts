import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { SlsUiFormControlErrorsPipe } from './form-control-errors.pipe';
import { PrimeNgControlBehaviorDirective } from './primeng-control-behavior.directive';

type SelectionMode = 'single' | 'range' | 'both';

@Component({
	selector: 'sls-ui-datepicker',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		DatePickerModule,
		SlsUiFormControlErrorsPipe,
		ToggleSwitchModule,
	],
	templateUrl: './datepicker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: PrimeNgControlBehaviorDirective,
			inputs: ['control', 'label', 'id', 'errorTexts', 'maxDate'],
		},
	],
})
export class SlsUiDatepickerComponent {
	readonly host = inject(PrimeNgControlBehaviorDirective, { self: true });
	readonly selectionMode = input<SelectionMode>('single');
	readonly selectionModeControl = new FormControl<SelectionMode>('single');

	get isRequired(): boolean {
		return this.host.control().hasValidator(Validators.required);
	}
}
