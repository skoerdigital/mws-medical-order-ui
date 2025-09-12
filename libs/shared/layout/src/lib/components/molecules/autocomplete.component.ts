import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import {
	AutoCompleteCompleteEvent,
	AutoCompleteModule,
} from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';

import { DictionaryEntry } from '@sls-ui/models';

import { SlsUiFormControlErrorsPipe } from './form-control-errors.pipe';
import { PrimeNgControlBehaviorDirective } from './primeng-control-behavior.directive';

interface AutocompleteSuggestions {
	name: string;
	value: string;
}

@Component({
	selector: 'sls-ui-autocomplete',
	templateUrl: './autocomplete.component.html',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SlsUiFormControlErrorsPipe,
		MultiSelectModule,
		AutoCompleteModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: PrimeNgControlBehaviorDirective,
			inputs: ['control', 'label', 'id', 'errorTexts'],
		},
	],
})
export class SlsUiAutocompleteComponent {
	readonly host = inject(PrimeNgControlBehaviorDirective, { self: true });
	readonly options = input.required<DictionaryEntry[]>();
	readonly complete = output<AutoCompleteCompleteEvent>();
	readonly suggestions = input.required<AutocompleteSuggestions[]>();

	get isRequired(): boolean {
		return this.host.control().hasValidator(Validators.required);
	}
}
