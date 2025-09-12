import { FormArray, FormControl, FormGroup } from '@angular/forms';

/**
 * Recursive type extracting all value types stored in FormControl.
 *
 * This type checks sequentially:
 * - If T is of type FormControl, it extracts type U (the control's value).
 * - If T is of type FormGroup, it recursively extracts types from each control element in the group.
 * - If T is of type FormArray, it recursively extracts types from the array element.
 * - Otherwise, it returns never.
 *
 * Thanks to this, for a given form structure, e.g.:
 *
 * type SearchClaimsForm = FormGroup<{
 *    basicCriteria: FormGroup<{
 *        claimNumber: FormControl<string | null>;
 *        policyNumber: FormControl<string | null>;
 *        lastName: FormControl<string | null>;
 *        firstName: FormControl<string | null>;
 *        street: FormControl<string | null>;
 *        city: FormControl<string | null>;
 *        pesel: FormControl<string | null>;
 *        nip: FormControl<string | null>;
 *        regon: FormControl<string | null>;
 *        birthDate: FormControl<Date | null>;
 *        declarationNumber: FormControl<string | null>;
 *        companyName: FormControl<string | null>;
 *        eventDate: FormControl<Date | null>;
 *    }>;
 *    notice: FormGroup<{
 *        dateRange: FormControl<Date | [Date, Date] | null>;
 *        form: FormControl<string[] | null>;
 *        state: FormControl<string[] | null>;
 *        operator: FormControl<string | null>;
 *    }>;
 * }>;
 *
 * The type ExtractFormControlValues<SearchClaimsForm> will resolve to the union:
 * string | null | Date | [Date, Date] | string[] | null
 *
 * @template T - The type from which we want to extract types from FormControl.
 */
export type ExtractFormControlValues<T> =
	T extends FormControl<infer U>
		? U
		: T extends FormGroup<infer Controls>
			? ExtractFormControlValues<Controls[keyof Controls]>
			: T extends FormArray<infer U>
				? ExtractFormControlValues<U>
				: never;
