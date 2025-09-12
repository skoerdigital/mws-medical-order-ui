import { APP_INITIALIZER, Provider } from '@angular/core';
import { Router } from '@angular/router';

import { MF_DYNAMIC_REMOTE_CONFIG } from './mf-dynamic-remote-config,token';
import { MFDynamicRemoteConfig } from './mf-dynamic-remote-config.model';
import { buildRouteConfig } from './routes-builder';

export const provideMFConfig = (manifest: MFDynamicRemoteConfig): Provider[] =>
	[
		{
			provide: APP_INITIALIZER,
			useFactory: (router: Router) => () => {
				const routes = buildRouteConfig(manifest, router.config);
				router.resetConfig(routes);
			},
			deps: [Router],
			multi: true,
		},
		{
			provide: MF_DYNAMIC_REMOTE_CONFIG,
			useValue: Object.fromEntries(
				Object.keys(manifest).map((key) => [
					key,
					{
						routePath: manifest[key].routePath,
						displayName: manifest[key].displayName,
					},
				]),
			),
		},
	] as Provider[];
