import { IsPlainObject } from './is-plain-object';

/**
 * Computes all valid dot‑notation paths from an object T.
 *
 * When recursing, we use NonNullable<T[K]> so that even if a property’s type includes
 * null or undefined, its nested keys are still available.
 */
export type DotPaths<T> = T extends object
	? {
			[K in Extract<keyof T, string>]: IsPlainObject<
				NonNullable<T[K]>
			> extends true
				? K | `${K}.${DotPaths<NonNullable<T[K]>>}`
				: K;
		}[Extract<keyof T, string>]
	: '';
