import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import {
	MultiSelect,
	MultiSelectModule,
	MultiSelectStyle,
} from 'primeng/multiselect';

import { SlsUiFormControlErrorsPipe } from './form-control-errors.pipe';
import { PrimeNgControlBehaviorDirective } from './primeng-control-behavior.directive';

@Component({
	selector: 'sls-ui-multiselect',
	templateUrl: './multiselect.component.html',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SlsUiFormControlErrorsPipe,
		MultiSelectModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [MultiSelectStyle],
	hostDirectives: [
		{
			directive: PrimeNgControlBehaviorDirective,
			inputs: ['control', 'label', 'id', 'errorTexts'],
		},
	],
})
export class SlsUiMultiselectComponent extends MultiSelect {
	readonly host = inject(PrimeNgControlBehaviorDirective, { self: true });
	override get hostClasses(): string {
		return '';
	}

	get isRequired(): boolean {
		return this.host.control().hasValidator(Validators.required);
	}
}
