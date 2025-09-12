import { AbstractControl } from '@angular/forms';

import { Observable, of, tap } from 'rxjs';

import { policyNumberValidator } from './policy-number.validator';

describe('policyNumberValidator', () => {
	it('should return null if the policy number is valid (Observable)', (done) => {
		const ispolicyNumberValidAsyncFn = jest.fn().mockReturnValue(of(true));
		const validator = policyNumberValidator(ispolicyNumberValidAsyncFn);
		const control = { value: 'valid-policy-number' } as AbstractControl;

		(validator(control) as Observable<boolean | null>)
			.pipe(
				tap((result) => {
					expect(result).toBeNull();
					done();
				}),
			)
			.subscribe();
	});

	it('should return an error if the policy number is invalid (Observable)', (done) => {
		const ispolicyNumberValidAsyncFn = jest.fn().mockReturnValue(of(false));
		const validator = policyNumberValidator(ispolicyNumberValidAsyncFn);
		const control = { value: 'invalid-policy-number' } as AbstractControl;

		(validator(control) as Observable<boolean | null>)
			.pipe(
				tap((result) => {
					expect(result).toEqual({ policyNumberInvalid: true });
					done();
				}),
			)
			.subscribe();
	});

	it('should return null if the policy number is valid (Promise)', async () => {
		const ispolicyNumberValidAsyncFn = jest
			.fn()
			.mockReturnValue(Promise.resolve(true));
		const validator = policyNumberValidator(ispolicyNumberValidAsyncFn);
		const control = { value: 'valid-policy-number' } as AbstractControl;

		const result = await validator(control);
		expect(result).toBeNull();
	});

	it('should return an error if the policy number is invalid (Promise)', async () => {
		const ispolicyNumberValidAsyncFn = jest
			.fn()
			.mockReturnValue(Promise.resolve(false));
		const validator = policyNumberValidator(ispolicyNumberValidAsyncFn);
		const control = { value: 'invalid-policy-number' } as AbstractControl;

		const result = await validator(control);
		expect(result).toEqual({ policyNumberInvalid: true });
	});
});
