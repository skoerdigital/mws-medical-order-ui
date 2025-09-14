import { InjectionToken, Provider } from '@angular/core';

import { DeepPartial } from '@sls-ui/models';

import { MwsMedicalOrderSettings } from './models';
import { MWS_MEDICAL_ORDER_DEFAULT_SETTINGS } from './mws-medical-order-default-settings';

export const MWS_MEDICAL_ORDER_SETTINGS =
	new InjectionToken<MwsMedicalOrderSettings>('MWS_MEDICAL_ORDER_SETTINGS');

export const provideMwsMedicalOrder = (
	settings: DeepPartial<MwsMedicalOrderSettings>,
): Provider[] => [
	{
		provide: MWS_MEDICAL_ORDER_SETTINGS,
		useValue: { ...MWS_MEDICAL_ORDER_DEFAULT_SETTINGS, ...settings },
	},
];
