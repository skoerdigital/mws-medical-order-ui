import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LAYOUT_SETTINGS } from '../../providers';

@Component({
	selector: 'sls-ui-footer',
	standalone: true,
	imports: [],
	templateUrl: './footer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlsUiFooterComponent {
	readonly layoutSettings = inject(LAYOUT_SETTINGS);
	readonly copyrightText = this.layoutSettings.footer.copyrightText;
}
