import { Directive, computed, inject, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { TEXTS } from '@sls-ui/texts';

import { FormControlWrapper } from '../../models';

@Directive({
	selector: '[slsUiPrimeNgControlBehavior]',
	standalone: true,
	exportAs: 'slsUiPrimeNgControlBehavior',
})
export class PrimeNgControlBehaviorDirective implements FormControlWrapper {
	readonly control = input.required<AbstractControl>();
	readonly label = input.required<string>();
	readonly id = input.required<string>();
	readonly class = input<string>('');
	readonly maxDate = input<Date | null>(null);
	readonly options = input<any[]>([]);
	readonly optionLabel = input<string | null>(null);
	readonly optionValue = input<string | null>(null);

	readonly errorTextsFromInput = input<Record<string, string>>(
		{},
		{ alias: 'errorTexts' },
	);
	private readonly errorTextsFromDI = inject(TEXTS, { optional: true })?.[
		'errors'
	] as Record<string, string>;
	readonly errorTexts = computed(
		() =>
			(!!Object.keys(this.errorTextsFromInput()).length &&
				this.errorTextsFromInput()) ||
			this.errorTextsFromDI,
	);
}
