import { FormControl } from '@angular/forms';

import { peselValidator, validatePesel } from './pesel.validator';

describe('validatePesel', () => {
	it('should return false for PESEL with incorrect length', () => {
		expect(validatePesel('1234567890')).toBe(false);
		expect(validatePesel('123456789012')).toBe(false);
	});

	it('should return false for PESEL with non-digit characters', () => {
		expect(validatePesel('1234567890a')).toBe(false);
		expect(validatePesel('abcdefghijk')).toBe(false);
	});

	it('should return false for PESEL with incorrect control number', () => {
		expect(validatePesel('44051401358')).toBe(false);
	});

	it('should return true for valid PESEL', () => {
		expect(validatePesel('44051401359')).toBe(true);
		expect(validatePesel('02070803628')).toBe(true);
	});
});

describe('peselValidator', () => {
	it('should return null for empty control value', () => {
		const control = new FormControl('');
		const validator = peselValidator();
		expect(validator(control)).toBeNull();
	});

	it('should return validation error for invalid PESEL', () => {
		const control = new FormControl('1234567890');
		const validator = peselValidator();
		expect(validator(control)).toEqual({ invalidPesel: true });
	});

	it('should return null for valid PESEL', () => {
		const control = new FormControl('44051401359');
		const validator = peselValidator();
		expect(validator(control)).toBeNull();
	});
});
