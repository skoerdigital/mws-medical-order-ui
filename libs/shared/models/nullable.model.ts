/**
 * A utility type that recursively makes all properties of a given type nullable.
 *
 * This type can be particularly useful for form-like interfaces where fields may be optional or not yet filled out.
 *
 * @template T - The type to be made nullable.
 */
export type Nullable<T> = {
	// @typescript-eslint/no-unsafe-function-type
	[P in keyof T]: T[P] extends Date | Array<unknown> | (() => void)
		? T[P] | null
		: T[P] extends object
			? Nullable<T[P]>
			: T[P] | null;
};
