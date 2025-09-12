import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GLOBAL_LOADER_SETTINGS } from '../tokens';

@Component({
	selector: 'sls-ui-global-loader',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './global-loader.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlsUiGlobalLoaderComponent {
	protected readonly globalLoaderSettings$ = inject(
		GLOBAL_LOADER_SETTINGS,
	).asObservable();
}
