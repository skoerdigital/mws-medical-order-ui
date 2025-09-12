import { Directive, ElementRef, effect, inject, input } from '@angular/core';

/**
 * Directive that scrolls an element to the bottom whenever its content changes (increases).
 *
 * @selector [slsUiScrolltoBottomOnChange]
 */
@Directive({
	selector: '[slsUiScrollBottomOn]',
	standalone: true,
})
export class SlsUiScrollBottomOnDirective {
	private readonly elementRef = inject(ElementRef);

	// I want for this property name to express what it keeps, so alias is needed
	readonly trigger = input.required<unknown>({ alias: 'slsUiScrollBottomOn' });

	constructor() {
		effect(() => {
			if (this.trigger()) {
				(this.elementRef.nativeElement as HTMLElement).scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				});
			}
		});
	}
}
