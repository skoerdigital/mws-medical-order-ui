import { FormControl } from '@angular/forms';

import { regonValidator, validateREGON } from './regon.validator';

describe('validateREGON', () => {
	it('should return false for invalid REGON length', () => {
		expect(validateREGON('123')).toBe(false);
		expect(validateREGON('123456789012')).toBe(false);
	});

	it('should return false for REGON with non-digit characters', () => {
		expect(validateREGON('12345678a')).toBe(false);
		expect(validateREGON('1234567890123b')).toBe(false);
	});

	it('should return true for valid 9-digit REGON', () => {
		expect(validateREGON('123456785')).toBe(true); // Example valid 9-digit REGON
	});

	it('should return false for invalid 9-digit REGON', () => {
		expect(validateREGON('123456789')).toBe(false);
	});

	it('should return true for valid 14-digit REGON', () => {
		expect(validateREGON('12345678512347')).toBe(true); // Example valid 14-digit REGON
	});

	it('should return false for invalid 14-digit REGON', () => {
		expect(validateREGON('12345678901234')).toBe(false);
	});

	// Additional tests
	it('should return false for empty string', () => {
		expect(validateREGON('')).toBe(false);
	});

	it('should return false for null value', () => {
		expect(validateREGON(null as any)).toBe(false);
	});

	it('should return false for undefined value', () => {
		expect(validateREGON(undefined as any)).toBe(false);
	});

	it('should return false for REGON with special characters', () => {
		expect(validateREGON('12345678!')).toBe(false);
		expect(validateREGON('1234567890123@')).toBe(false);
	});
});

describe('regonValidator', () => {
	it('should return null for empty control value', () => {
		const control = new FormControl('');
		const validator = regonValidator();
		expect(validator(control)).toBeNull();
	});

	it('should return null for valid 9-digit REGON', () => {
		const control = new FormControl('123456785'); // Example valid 9-digit REGON
		const validator = regonValidator();
		expect(validator(control)).toBeNull();
	});

	it('should return { invalidRegon: true } for invalid 9-digit REGON', () => {
		const control = new FormControl('123456789');
		const validator = regonValidator();
		expect(validator(control)).toEqual({ invalidRegon: true });
	});

	it('should return null for valid 14-digit REGON', () => {
		const control = new FormControl('12345678512347'); // Example valid 14-digit REGON
		const validator = regonValidator();
		expect(validator(control)).toBeNull();
	});

	it('should return { invalidRegon: true } for invalid 14-digit REGON', () => {
		const control = new FormControl('12345678901234');
		const validator = regonValidator();
		expect(validator(control)).toEqual({ invalidRegon: true });
	});

	// Additional tests
	it('should return { invalidRegon: true } for REGON with non-digit characters', () => {
		const control = new FormControl('12345678a');
		const validator = regonValidator();
		expect(validator(control)).toEqual({ invalidRegon: true });
	});

	it('should return { invalidRegon: true } for REGON with special characters', () => {
		const control = new FormControl('12345678!');
		const validator = regonValidator();
		expect(validator(control)).toEqual({ invalidRegon: true });
	});
});
