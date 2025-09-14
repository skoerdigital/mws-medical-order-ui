import { Route } from '@angular/router';

import mwsMedicalOrderTexts from '../mws-medical-order-texts.json';

export const appRoutes: Route[] = [
	{
		path: 'medical-order',
		loadChildren: () =>
			import('@mws/medical-order').then((m) =>
				m.getmwsMedicalOrderRoutes({
					texts: mwsMedicalOrderTexts,
					title: 'Medical Orders',
				}),
			),
	},
	{
		path: '**',
		redirectTo: 'medical-order',
		pathMatch: 'full',
	},
];
