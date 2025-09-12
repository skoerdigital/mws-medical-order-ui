/**
 * Checks whether T is a plain object (i.e. not an array, Date, Promise, etc.).
 *
 * Using NonNullable<T> ensures that even if T includes null/undefined, we still
 * consider its structure.
 */
export type IsPlainObject<T> =
	NonNullable<T> extends object
		? NonNullable<T> extends any[]
			? false
			: NonNullable<T> extends Date
				? false
				: NonNullable<T> extends Promise<any>
					? false
					: true
		: false;
