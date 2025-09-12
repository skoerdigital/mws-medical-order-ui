import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nipValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const isValid = validateNIP(control.value);
		return isValid ? null : { invalidNIP: { value: control.value } };
	};
}

export function validateNIP(nip: string): boolean {
	if (!nip) {
		return true;
	}

	if (!/^\d{10}$/.test(nip)) {
		return false;
	}

	const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
	const digits = nip.split('').map(Number);
	const checksum =
		digits
			.slice(0, 9)
			.reduce((acc, digit, index) => acc + digit * weights[index], 0) % 11;

	return checksum === digits[9];
}
