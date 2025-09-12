import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function peselValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const pesel = control.value;
		if (!pesel) {
			return null;
		}

		const isValid = validatePesel(pesel);
		return isValid ? null : { invalidPesel: true };
	};
}

export function validatePesel(pesel: string): boolean {
	if (pesel.length !== 11 || !/^\d+$/.test(pesel)) {
		return false;
	}

	const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
	const controlNumber = parseInt(pesel[10], 10);
	const sum = pesel
		.split('')
		.slice(0, 10)
		.reduce(
			(acc, digit, index) => acc + parseInt(digit, 10) * weights[index],
			0,
		);

	const calculatedControlNumber = (10 - (sum % 10)) % 10;
	return controlNumber === calculatedControlNumber;
}
