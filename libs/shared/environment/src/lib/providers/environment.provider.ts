import { Provider } from '@angular/core';

import { SlsEnvironment } from '../models';
import { SLS_ENVIRONMENT } from '../tokens';

export const provideEnvironment = (environment: SlsEnvironment): Provider => ({
	provide: SLS_ENVIRONMENT,
	useValue: environment,
});
