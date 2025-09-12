import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Pipe({
	name: 'slsUiFormControlErrors',
	pure: false,
	standalone: true,
})
export class SlsUiFormControlErrorsPipe implements PipeTransform {
	transform(
		control: AbstractControl | null,
		translations?: Record<string, string>,
	): (keyof ValidationErrors)[] | null {
		return control?.dirty && control?.value
			? Object.keys(control?.errors || {}).map(
					(key) => translations?.[key] || key,
				)
			: null;
	}
}
