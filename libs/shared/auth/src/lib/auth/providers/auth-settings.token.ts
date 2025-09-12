import { InjectionToken } from '@angular/core';

import { AuthSettings } from '../models';

export const AUTH_SETTINGS = new InjectionToken<AuthSettings>(
	'sls-ui-auth-settings',
);
