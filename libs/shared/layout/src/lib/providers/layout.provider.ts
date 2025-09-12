import { Provider } from '@angular/core';

import merge from 'lodash.merge';

import { DeepPartial } from '@sls-ui/models';

import { LayoutSettings } from '../models';
import { LAYOUT_DEFAULT_SETTINGS } from './default-config';
import { LAYOUT_SETTINGS } from './layout-settings.token';

export const provideLayout = (
	layoutSettings?: DeepPartial<LayoutSettings>,
): Provider =>
	({
		provide: LAYOUT_SETTINGS,
		useValue: merge({}, LAYOUT_DEFAULT_SETTINGS, layoutSettings),
	}) satisfies Provider;

export const withDefaultConfig = (): LayoutSettings =>
	({
		...LAYOUT_DEFAULT_SETTINGS,
	}) as LayoutSettings;
