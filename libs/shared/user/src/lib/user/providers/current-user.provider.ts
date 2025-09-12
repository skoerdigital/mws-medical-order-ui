import { Provider } from '@angular/core';

import merge from 'lodash.merge';
import { map } from 'rxjs';

import { USER_API_DEFAULT_ENDPOINTS } from '../consts';
import { UserApi } from '../models/user-api.model';
import { SlsUserLibrarySettings } from '../models/user-library-settings.model';
import { UserApiService } from '../services';
import { SLS_UI_CURRENT_USER, USER_SETTINGS } from '../tokens';

export const provideCurrentUser = (
	settings?: SlsUserLibrarySettings<UserApi>,
): Provider[] => [
	UserApiService,
	{
		provide: SLS_UI_CURRENT_USER,
		useFactory: (userApiService: UserApiService) =>
			userApiService
				.getCurrentUserInfo()
				.pipe(map((user) => user || 'No user loaded')),
		deps: [UserApiService],
	},
	{
		provide: USER_SETTINGS,
		useValue: merge({}, { apiEndpoints: USER_API_DEFAULT_ENDPOINTS }, settings),
	},
];
