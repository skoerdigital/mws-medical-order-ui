import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
} from '@angular/forms';

import { Observable, map, of } from 'rxjs';

export function policyNumberValidator(
	ispolicyNumberValidAsyncFn: (
		policyNumber: string,
	) => Observable<boolean> | Promise<boolean>,
): AsyncValidatorFn {
	return (
		control: AbstractControl,
	): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> => {
		const result = ispolicyNumberValidAsyncFn(control.value);

		if (result instanceof Promise) {
			return result.then((ispolicyNumberValid) => {
				return ispolicyNumberValid ? null : { policyNumberInvalid: true };
			});
		}

		if (result instanceof Observable) {
			return result.pipe(
				map((ispolicyNumberValid) => {
					return ispolicyNumberValid ? null : { invalidPolicyNumber: true };
				}),
			);
		}

		return of(null);
	};
}
