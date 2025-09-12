import { HttpClient } from '@angular/common/http';
import {
	APP_INITIALIZER,
	ENVIRONMENT_INITIALIZER,
	Provider,
	inject,
} from '@angular/core';
import { Router } from '@angular/router';

import { REDIRECT_URL_STORE_KEY } from '../../consts';
import { AuthSettings, AuthSettingsParams } from '../models';
import { AuthSettingsService } from '../services';
import { handleLogin } from '../utils';
import { AUTH_SETTINGS } from './auth-settings.token';

export const provideAuth = ({
	getAuthUrlFn,
	redirectUrlStoreKey,
	redirectUrlStorage,
	getIsAutorisedFn,
}: AuthSettingsParams): Provider[] => [
	AuthSettingsService,
	{
		provide: AUTH_SETTINGS,
		useFactory: () => {
			return {
				redirectUrlStoreKey: redirectUrlStoreKey || REDIRECT_URL_STORE_KEY,
				redirectUrlStorage: redirectUrlStorage || sessionStorage,
				getIsAutorisedFn,
			} as AuthSettings;
		},
	},
	{
		provide: APP_INITIALIZER,
		useFactory: () =>
			handleRedirectAfterSuccessfulAuth.bind(
				this,
				inject(Router),
				inject(AUTH_SETTINGS) as Required<AuthSettings>,
			),
		multi: true,
	},
	{
		provide: ENVIRONMENT_INITIALIZER,
		useFactory: () => () =>
			initializeAuth({
				getAuthUrlFn,
				getIsAutorisedFn,
			}),
		multi: true,
	},
];

const initializeAuth = async ({
	getAuthUrlFn,
	getIsAutorisedFn,
}: Pick<AuthSettingsParams, 'getAuthUrlFn' | 'getIsAutorisedFn'>) => {
	const http = inject(HttpClient);
	const router = inject(Router);
	const authSettingsService = inject(AuthSettingsService);
	const { redirectUrlStorage, redirectUrlStoreKey } = inject(AUTH_SETTINGS);
	const authUrl = await getAuthUrlFn(http);
	authSettingsService.authUrl = authUrl;

	if (getIsAutorisedFn) {
		const isAutorised = await getIsAutorisedFn(http);

		if (!isAutorised) {
			handleLogin(router, redirectUrlStorage, redirectUrlStoreKey, authUrl);
		}
	}

	return;
};

const handleRedirectAfterSuccessfulAuth = (
	router: Router,
	settings: Required<AuthSettings>,
): void => {
	const { redirectUrlStorage, redirectUrlStoreKey } = settings;
	const redirectUrl = redirectUrlStorage.getItem(redirectUrlStoreKey);

	if (!redirectUrl) {
		return;
	}

	router.navigateByUrl(redirectUrl);
	redirectUrlStorage.removeItem(redirectUrlStoreKey);
};
