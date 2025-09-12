import { InjectionToken } from '@angular/core';

import { SlsEnvironment } from '../models';

export const SLS_ENVIRONMENT = new InjectionToken<SlsEnvironment>(
	'sls-environment',
);
