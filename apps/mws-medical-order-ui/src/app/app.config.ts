import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import { provideLayout } from '@sls-ui/layout';

import { environment } from '../environments/environment';
import { PZU } from '../pzu.theme';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { withErrorHandlerInterceptor } from '@sls-ui/http';
import { MessageService } from 'primeng/api';
import { provideCurrentUser } from '@sls-ui/user';
import { ApiEndpoints } from '@sls-ui/models';
import { provideQueryLocationStrategy } from '@sls-ui/utils';
import primengLocale from '../primeng-locale-pl.json';
import { withHandleOAuthInterceptor } from '@sls-ui/auth';

export const appConfig: ApplicationConfig = {
	providers: [
		provideAnimationsAsync(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes,
			withComponentInputBinding()
		),
		provideHttpClient(
			withInterceptors([
				withHandleOAuthInterceptor(),
				withErrorHandlerInterceptor({
					inject: MessageService,
					mode: 'error',
					getErrorMessage: ({ status }) => status.toString(),
					handleErrorFnFactory: (messageService) => (error) => {
						messageService?.add({
							summary: error,
							severity: 'error',
							closable: false,
						});
					},
				}),
			])
		),
		provideLayout({
			sidemenu: {
				items: [],
			},
			header: {
				title: 'MWS MEDICAL ORDER',
			}
		}),
		providePrimeNG({
			theme: {
				preset: definePreset(Aura, PZU),
				options: {
					cssLayer: {
						name: 'primeng',
						order: 'tailwind-base, primeng, tailwind-utilities',
					},

				},
			},
			translation: primengLocale,
		}),
		MessageService,
		provideCurrentUser({
			apiEndpoints: { ...environment.apiEndpoints } as ApiEndpoints<any>
		}),
		provideQueryLocationStrategy(),
	],
};
