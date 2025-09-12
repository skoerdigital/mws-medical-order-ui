import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'sls-ui-data-will-appear',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './data-will-appear.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlsUiDataWillAppearComponent {}
