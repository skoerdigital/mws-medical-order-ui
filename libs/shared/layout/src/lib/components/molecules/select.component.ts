import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	FormControlDirective,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

import { SelectModule, SelectStyle } from 'primeng/select';

import { SlsUiFormControlErrorsPipe } from './form-control-errors.pipe';
import { PrimeNgControlBehaviorDirective } from './primeng-control-behavior.directive';

@Component({
	selector: 'sls-ui-select',
	templateUrl: './select.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, SlsUiFormControlErrorsPipe, SelectModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SelectStyle, FormControlDirective],
	hostDirectives: [
		{
			directive: PrimeNgControlBehaviorDirective,
			inputs: [
				'control',
				'label',
				'id',
				'class',
				'errorTexts',
				'options',
				'optionLabel',
				'optionValue',
			],
		},
	],
})
export class SlsUiSelectComponent {
	readonly host = inject(PrimeNgControlBehaviorDirective, { self: true });

	get isRequired(): boolean {
		return this.host.control().hasValidator(Validators.required);
	}
}
