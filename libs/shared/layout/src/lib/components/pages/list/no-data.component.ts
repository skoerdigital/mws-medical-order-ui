import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'sls-ui-no-data',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './no-data.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlsUiNoDataComponent {}
