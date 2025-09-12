import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	FormControlDirective,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

import { Select, SelectModule, SelectStyle } from 'primeng/select';

import { SlsUiFormControlErrorsPipe } from './form-control-errors.pipe';
import { PrimeNgControlBehaviorDirective } from './primeng-control-behavior.directive';

@Component({
	selector: 'sls-ui-select',
	templateUrl: './select.component.html',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SlsUiFormControlErrorsPipe,
		SelectModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SelectStyle, FormControlDirective],
	hostDirectives: [
		{
			directive: PrimeNgControlBehaviorDirective,
			inputs: ['control', 'label', 'id', 'errorTexts'],
		},
	],
})
export class SlsUiSelectComponent extends Select {
	readonly host = inject(PrimeNgControlBehaviorDirective, { self: true });
	override get hostClass(): string {
		return '';
	}

	get isRequired(): boolean {
		return this.host.control().hasValidator(Validators.required);
	}
}
