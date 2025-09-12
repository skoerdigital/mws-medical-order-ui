import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function prefixedPhoneNumberValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		const phoneNumber = control.value.toString().replace(/\s/g, '');
		const internationalPhoneRegex = /^\+[1-9]\d{0,3}[0-9]{6,14}$/;

		if (!internationalPhoneRegex.test(phoneNumber)) {
			return { prefixedPhoneNumber: true };
		}

		return null;
	};
}
