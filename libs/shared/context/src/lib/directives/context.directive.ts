import {
	Directive,
	TemplateRef,
	ViewContainerRef,
	effect,
	inject,
	input,
} from '@angular/core';

import { Context } from '../models';
import { CONTEXT } from '../providers';

@Directive({
	selector: '[slsUiContext]',
	standalone: true,
})
export class SlsUiContextDirective {
	private readonly boundedContext = inject(CONTEXT);
	private readonly templateRef = inject(TemplateRef);
	private readonly viewContainerRef = inject(ViewContainerRef);
	// I want for this property name to express what it keeps, so alias is needed

	readonly context = input.required<Context>({ alias: 'slsUiContext' });

	constructor() {
		effect(() => {
			this.viewContainerRef.clear();

			if (this.context() === this.settingsContext || !this.settingsContext) {
				this.renderElement();
			}
		});
	}

	private get settingsContext(): Context | null {
		return this.boundedContext || null;
	}

	private renderElement(): void {
		this.viewContainerRef.createEmbeddedView(this.templateRef);
	}
}
