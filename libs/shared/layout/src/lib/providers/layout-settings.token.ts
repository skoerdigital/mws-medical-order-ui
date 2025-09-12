import { InjectionToken } from '@angular/core';

import { LayoutSettings } from '../models';

export const LAYOUT_SETTINGS = new InjectionToken<LayoutSettings>(
	'LAYOUT_TOKEN',
);
