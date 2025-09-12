import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { SlsUser } from '../models';

export const SLS_UI_CURRENT_USER = new InjectionToken<Observable<SlsUser>>(
	'sls-ui-current-user>',
);
