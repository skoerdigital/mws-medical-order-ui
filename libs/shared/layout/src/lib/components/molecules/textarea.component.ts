import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	TemplateRef,
	contentChild,
	inject,
	input,
	signal,
} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { TextareaModule } from 'primeng/textarea';

import { SlsUiFormControlErrorsPipe } from './form-control-errors.pipe';
import { PrimeNgControlBehaviorDirective } from './primeng-control-behavior.directive';

@Component({
	selector: 'sls-ui-textarea',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TextareaModule,
		SlsUiFormControlErrorsPipe,
	],
	templateUrl: './textarea.component.html',
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
export class SlsUiTextareaComponent {
	readonly host = inject(PrimeNgControlBehaviorDirective, { self: true });
	readonly maxlength = input<number>();
	readonly isFocused = signal<boolean>(false);
	readonly customInputComponentTemplate = contentChild(TemplateRef, {
		descendants: false,
	});

	get isRequired(): boolean {
		return this.host.control().hasValidator(Validators.required);
	}

	onToggleFocus(isFocued: boolean): void {
		this.isFocused.set(isFocued);
	}
}
