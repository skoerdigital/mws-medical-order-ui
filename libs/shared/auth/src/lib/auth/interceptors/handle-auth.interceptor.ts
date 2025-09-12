import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandlerFn,
	HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, tap } from 'rxjs';

import { AuthSettings } from '../models';
import { AUTH_SETTINGS } from '../providers';
import { handleLogin } from '../utils';
import { AuthSettingsService } from '../services';

export const handleOAuthInterceptor = <T>(
	request: HttpRequest<T>,
	next: HttpHandlerFn,
	{
		redirectUrlStorage,
		redirectUrlStoreKey,
	}: Required<AuthSettings>,
	routerInstance: Router,
	authUrl: string,
): Observable<HttpEvent<unknown>> => {
	const xsrfToken = document.cookie
		.split('; ')
		.find((row) => row.startsWith('XSRF-TOKEN='))
		?.split('=')[1];

	if (xsrfToken) {
		request = request.clone({
			setHeaders: {
				'X-XSRF-TOKEN': xsrfToken,
			},
			withCredentials: true,
		});
	}
	return next(request).pipe(
		tap({
			error: ({ status }: HttpErrorResponse) => {
				if (status === 401) {
					handleLogin(
						routerInstance,
						redirectUrlStorage,
						redirectUrlStoreKey,
						authUrl,
					);
				}
			},
		}),
	);
};

export const withHandleOAuthInterceptor =
	() => (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
		const authSettings = inject(AUTH_SETTINGS) as Required<AuthSettings>;
		const authUrl = inject(AuthSettingsService).authUrl;
		const router = inject(Router);

		return handleOAuthInterceptor(
			request,
			next,
			authSettings,
			router,
			authUrl,
		);
	};
