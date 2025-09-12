import { InjectionToken } from '@angular/core';

import { ReplaySubject, Subject } from 'rxjs';

import { GlobalLoaderSettings } from '../models';

export const GLOBAL_LOADER_SETTINGS = new InjectionToken<
	Subject<GlobalLoaderSettings>
>('global-loader-settings', {
	providedIn: 'root',
	factory: () => new ReplaySubject(1),
});
