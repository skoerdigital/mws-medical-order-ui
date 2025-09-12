import { AbstractControl } from '@angular/forms';

import { nipValidator, validateNIP } from './nip.validator';

describe('nipValidator', () => {
	it('should return null for valid NIP', () => {
		const control = { value: '1234563218' } as AbstractControl;
		const validator = nipValidator();
		expect(validator(control)).toBeNull();
	});

	it('should return an error object for invalid NIP', () => {
		const control = { value: '1234567890' } as AbstractControl;
		const validator = nipValidator();
		expect(validator(control)).toEqual({ invalidNIP: { value: '1234567890' } });
	});
});

describe('validateNIP', () => {
	it('should return true for valid NIP', () => {
		expect(validateNIP('1234563218')).toBe(true);
	});

	it('should return false for NIP with invalid length', () => {
		expect(validateNIP('123456789')).toBe(false);
		expect(validateNIP('12345678901')).toBe(false);
	});

	it('should return false for NIP with non-digit characters', () => {
		expect(validateNIP('12345678a0')).toBe(false);
	});

	it('should return false for NIP with invalid checksum', () => {
		expect(validateNIP('1234567890')).toBe(false);
	});
});
