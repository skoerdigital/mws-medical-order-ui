import { InjectionToken } from '@angular/core';

import { UserApi } from '../models/user-api.model';
import { SlsUserLibrarySettings } from '../models/user-library-settings.model';

export const USER_SETTINGS = new InjectionToken<
	SlsUserLibrarySettings<UserApi>
>('sls-ui-user-lib-settings>');
