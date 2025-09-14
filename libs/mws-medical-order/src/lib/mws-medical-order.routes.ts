import { Route } from '@angular/router';

import { DeepPartial } from '@sls-ui/models';

import { MwsMedicalOrderSettings } from './models';
import { MwsMedicalOrderComponent } from './mws-medical-order.component';
import { provideMwsMedicalOrder } from './mws-medical-order.provider';

export const getmwsMedicalOrderRoutes = (
	settings: DeepPartial<MwsMedicalOrderSettings>,
): Route[] => [
	{
		path: '',
		component: MwsMedicalOrderComponent,
		providers: [provideMwsMedicalOrder(settings)],
		children: [],
	},
];
