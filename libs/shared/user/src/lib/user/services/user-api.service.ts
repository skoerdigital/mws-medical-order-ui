import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, catchError, of } from 'rxjs';

import { withGlobalLoaderContext } from '@sls-ui/http';

import { USER_API_DEFAULT_ENDPOINTS } from '../consts';
import { SlsUser } from '../models';
import { UserApi } from '../models/user-api.model';
import { USER_SETTINGS } from '../tokens';

@Injectable()
export class UserApiService implements UserApi {
	private readonly http = inject(HttpClient);
	private readonly apiEndpoints = inject(USER_SETTINGS)
		.apiEndpoints as typeof USER_API_DEFAULT_ENDPOINTS;

	getCurrentUserInfo(): Observable<SlsUser | null> {
		return this.http
			.get<SlsUser | null>(this.apiEndpoints.getCurrentUserInfo, {
				context: withGlobalLoaderContext(),
			})
			.pipe(catchError(() => of(null)));
	}
}
