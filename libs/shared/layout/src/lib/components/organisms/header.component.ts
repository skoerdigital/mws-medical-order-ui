import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { map } from 'rxjs';

import { SLS_UI_CURRENT_USER } from '@sls-ui/user';

import { LAYOUT_SETTINGS } from '../../providers';

@Component({
	selector: 'sls-ui-header',
	standalone: true,
	imports: [CommonModule, ButtonModule, MenuModule, AvatarModule, AsyncPipe],
	templateUrl: './header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlsUiHeaderComponent {
	readonly layoutSettings = inject(LAYOUT_SETTINGS);
	readonly headerSettings = this.layoutSettings.header;
	readonly menuItems = this.layoutSettings.sidemenu.items?.length;
	readonly currentUser$ = inject(SLS_UI_CURRENT_USER)?.pipe(
		map((user) => user?.displayName),
	);
}
