import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	standalone: true,
	imports: [RouterModule],
	selector: 'mws-root',
	templateUrl: './app.component.html',
	styles: ``,
})
export class AppComponent {
	title = 'mws-medical-order-ui';
}
