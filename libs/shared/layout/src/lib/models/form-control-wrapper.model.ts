import { InputSignal } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface FormControlWrapper {
	control: InputSignal<AbstractControl<unknown>>;
	label: InputSignal<string>;
	id: InputSignal<string>;
}
