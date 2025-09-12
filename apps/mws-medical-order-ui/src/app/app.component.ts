import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToastModule } from 'primeng/toast';

import { SlsUiHeaderComponent } from '@sls-ui/layout';

@Component({
	standalone: true,
	imports: [RouterModule, ToastModule, SlsUiHeaderComponent],
	selector: 'mws-root',
	templateUrl: './app.component.html',
	styles: ``,
})
export class AppComponent {
	title = 'mws-medical-order-ui';
}
