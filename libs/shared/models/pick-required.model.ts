// Extracts keys of T that are required
/**
 * Extracts the keys from a type `T` that are required (non-optional).
 *
 * This utility type iterates over the keys of `T` and checks if the key is required.
 * If the key is required, it includes the key in the resulting type.
 * If the key is optional, it excludes the key from the resulting type.
 *
 * @template T - The type from which to extract the required keys.
 *
 * @example
 * type Example = {
 *   requiredKey: string;
 *   optionalKey?: number;
 * };
 *
 * type Result = RequiredKeys<Example>;
 * // Result is "requiredKey"
 */
type RequiredKeys<T> = {
	[K in keyof T]-?: object extends Pick<T, K> ? never : K;
}[keyof T];

// Picks only the required properties from T
export type PickRequired<T> = Pick<T, RequiredKeys<T>>;
