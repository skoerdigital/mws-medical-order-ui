import { InjectionToken, Provider } from '@angular/core';

import { Texts } from '../models';

export const TEXTS = new InjectionToken<Texts>('TEXTS');

/**
 * Provides the TEXTS injection token for the Angular dependency injection system.
 * This token is used to propagate text values across injectables within the same injector tree.
 *
 * The `provideTexts` function allows for the injection of a `Texts` object, which can be dynamically
 * modified at runtime, potentially through a JSON file. This enables the modification of static texts
 * in the application without requiring a rebuild.
 *
 * The `SlsUiTextPipe` can also utilize this token to manage and display static texts within the app.
 * @file /Users/tomaszwnuk/Desktop/Workspace/sls-ui-workspace/libs/shared/texts/src/lib/pipes/text.pipe.ts
 *
 * @param texts - An object containing text values to be injected.
 * @returns An object with the `provide` and `useValue` properties for Angular's dependency injection.
 *
 * @file /Users/tomaszwnuk/Desktop/Workspace/sls-ui-workspace/libs/shared/texts/src/lib/providers/text.provider.ts
 */
export const provideTexts = (texts: Texts): Provider => ({
	provide: TEXTS,
	useValue: texts,
});
