// ─── UTILITY TYPES ─────────────────────────────────────────────
import { DotPaths } from './dot-paths.model';

/** Convert a union type to an intersection type. */
type UnionToIntersection<U> = (U extends any ? (x: U) => any : never) extends (
	x: infer I,
) => any
	? I
	: never;

/** Simplify a type for better readability. */
type Simplify<T> = { [K in keyof T]: T[K] } & {};

/** Conditionally mark a property optional.
 * If V includes undefined, then property K becomes optional.
 */
type ConditionalOptional<K extends PropertyKey, V> = undefined extends V
	? { [P in K]?: V }
	: { [P in K]: V };

/** Check whether T is nullable (i.e. includes null or undefined). */
type IsNullable<T> = [T] extends [NonNullable<T>] ? false : true;

// ─── DOT-PATH RELATED ──────────────────────────────────────────

/** If T is non-empty, prefix with a dot. */
// type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

// ─── DEEP VALUE EXTRACTION ──────────────────────────────────────

/**
 * DeepValue<T, P> recursively extracts the type at a dot‑notation path P from T.
 *
 * It now uses the IsNullable helper: if a property type includes null or undefined,
 * we extract from its NonNullable version and then union the result with undefined.
 *
 * For example, for:
 *
 *   { a: { b: { c: string } | null } }
 *
 * extracting "a.b.c" yields: string | undefined.
 */
export type DeepValue<
	T,
	P extends string,
> = P extends `${infer Key}.${infer Rest}`
	? Key extends keyof T
		? IsNullable<T[Key]> extends true
			? DeepValue<NonNullable<T[Key]>, Rest> | undefined
			: DeepValue<T[Key], Rest>
		: never
	: P extends keyof T
		? IsNullable<T[P]> extends true
			? NonNullable<T[P]> | undefined
			: T[P]
		: never;

// ─── FLATTENING DOT-PATH INTO CAMELCASE ──────────────────────────

/**
 * FlattenKey<S> converts a dot‑notation string into a single camelCase key.
 *
 * The rule is:
 *  - The first segment remains unchanged.
 *  - Every subsequent segment is transformed so its first letter is capitalized.
 *
 * For example:
 *   FlattenKey<"path.to.key"> yields "pathToKey"
 */
export type FlattenKey<
	S extends string,
	IsFirst extends boolean = true,
> = S extends `${infer Segment}.${infer Rest}`
	? IsFirst extends true
		? `${Segment}${FlattenKey<Rest, false>}`
		: `${Capitalize<Segment>}${FlattenKey<Rest, false>}`
	: IsFirst extends true
		? S
		: Capitalize<S>;

// ─── FINAL DEEP PICK ───────────────────────────────────────────

/**
 * DeepPick<T, K> picks properties from T using dot‑notation keys and produces a flattened interface.
 *
 * - The second generic parameter K is constrained to valid dot‑paths from T (with IDE autocompletion).
 * - Each picked path is flattened to a single camelCase property name.
 * - If a property along the path is nullable (or optional), the extracted type is unioned with undefined.
 *
 * @example
 * For the type:
 *
 *   interface Claim {
 *     claimNumber: string;
 *     adjuster: ClaimAdjuster | null;
 *     accident: ClaimAccident;
 *   }
 *
 *   interface ClaimAdjuster {
 *     login: string;
 *     active: boolean;
 *     firstName: string;
 *     lastName: string;
 *     email: string;
 *     phoneNumbers: string[];
 *   }
 *
 *   interface ClaimAccident {
 *     date: string;
 *     location: {
 *       countryName: string;
 *       city: string;
 *       street: string;
 *     };
 *   }
 *
 * And picking:
 *
 *   type Keys =
 *     | 'claimNumber'
 *     | 'adjuster.firstName'
 *     | 'adjuster.lastName'
 *     | 'adjuster.login'
 *     | 'accident.date'
 *     | 'accident.location.city'
 *     | 'accident.location.countryName'
 *     | 'accident.location.street';
 *
 *   type SearchClaimsTableItem = DeepPick<Claim, Keys>;
 *
 * The resulting type is:
 *
 * {
 *   claimNumber: string;
 *   adjusterFirstName: string | undefined; // because adjuster can be null
 *   adjusterLastName: string | undefined;
 *   adjusterLogin: string | undefined;
 *   accidentDate: string;
 *   accidentLocationCity: string;
 *   accidentLocationCountryName: string;
 *   accidentLocationStreet: string;
 * }
 */
export type DeepPick<T, K extends DotPaths<T>> = Simplify<
	UnionToIntersection<
		K extends any ? ConditionalOptional<FlattenKey<K>, DeepValue<T, K>> : never
	>
>;
