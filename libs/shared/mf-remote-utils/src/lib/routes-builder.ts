import { loadRemoteModule } from '@nx/angular/mf';

import { Routes } from '@angular/router';

import { MFDynamicRemoteConfig } from './mf-dynamic-remote-config.model';

export function buildRouteConfig(
	mfConfig: MFDynamicRemoteConfig,
	staticRoutes: Routes,
): Routes {
	const dynamicRoutes: Routes = Object.keys(mfConfig).map((key) => {
		const config = mfConfig[key];

		return {
			path: config.routePath || key,
			loadChildren: () =>
				loadRemoteModule(key, config.exposes).then((m) => m.remoteRoutes),
		};
	});

	return [...staticRoutes, ...dynamicRoutes];
}
