import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function regonValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const regon = control.value;
		if (!regon) {
			return null;
		}

		const isValid = validateREGON(regon);
		return isValid ? null : { invalidRegon: true };
	};
}

export function validateREGON(regon: string): boolean {
	if (!/^\d{9}$/.test(regon) && !/^\d{14}$/.test(regon)) {
		return false;
	}

	const weights9 = [8, 9, 2, 3, 4, 5, 6, 7];
	const weights14 = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];

	if (regon.length === 9) {
		return checkSum(regon, weights9);
	}

	if (regon.length === 14) {
		return (
			checkSum(regon.substring(0, 9), weights9) && checkSum(regon, weights14)
		);
	}

	return false;
}

function checkSum(regon: string, weights: number[]): boolean {
	const sum = regon
		.split('')
		.slice(0, weights.length)
		.reduce(
			(acc, digit, index) => acc + parseInt(digit, 10) * weights[index],
			0,
		);

	const controlDigit = sum % 11 === 10 ? 0 : sum % 11;
	return controlDigit === parseInt(regon[weights.length], 10);
}
