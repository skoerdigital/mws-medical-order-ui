import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LAYOUT_SETTINGS } from '../../providers';

@Component({
	selector: 'sls-ui-sidemenu',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './sidemenu.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlsUiSidemenuComponent {
	readonly layoutSettings = inject(LAYOUT_SETTINGS);
	readonly menuItems = this.layoutSettings.sidemenu.items;
}
