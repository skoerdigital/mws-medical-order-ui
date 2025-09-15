import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	TemplateRef,
	contentChild,
	inject,
} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

import { SlsUiFormControlErrorsPipe } from './form-control-errors.pipe';
import { PrimeNgControlBehaviorDirective } from './primeng-control-behavior.directive';

@Component({
	selector: 'sls-ui-textfield',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputTextModule,
		SlsUiFormControlErrorsPipe,
	],
	templateUrl: './textfield.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
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
export class SlsUiTextfieldComponent {
	readonly host = inject(PrimeNgControlBehaviorDirective, { self: true });
	readonly customInputComponentTemplate = contentChild(TemplateRef, {
		descendants: false,
	});

	get isRequired(): boolean {
		return this.host.control().hasValidator(Validators.required);
	}
}
