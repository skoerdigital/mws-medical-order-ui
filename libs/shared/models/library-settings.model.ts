import { Context } from '@sls-ui/context';
import { Texts } from '@sls-ui/texts';

import { ApiEndpoints } from './api-endpoints.model';

/**
 * Model of common properties for module/library settings.
 * Providers of libraries should configure with these settings.
 */

export interface LibrarySettings<T = any> {
	apiEndpoints?: ApiEndpoints<T>;
	context?: Context | null;
	texts: Texts;
}
