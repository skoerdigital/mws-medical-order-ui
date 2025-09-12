import { InjectionToken, Provider } from '@angular/core';

import { Context } from '../models';

export const CONTEXT = new InjectionToken<Context | null>('sls-ui-context');

/**
 * Injection token for providing the context in the application.
 *
 * @remarks
 * The context can be either a specific context or null. If the context is null,
 * it means that the settings do not narrow the library to run in any specific context,
 * or both contexts are available.
 *
 * @param context - The context to be provided, which can be of type `Context` or `null`.
 * @returns A provider object with the specified context.
 */
export const provideContext = (context: Context | null): Provider =>
	({
		provide: CONTEXT,
		useValue: context,
	}) satisfies Provider;
