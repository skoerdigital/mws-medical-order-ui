import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'sls-ui-error-data',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './error-data.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlsUiErrorDataComponent {}
