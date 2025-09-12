import {
	Directive,
	OnInit,
	TemplateRef,
	ViewContainerRef,
	inject,
	input,
} from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { SlsUserAuthority } from '../models';
import { SLS_UI_CURRENT_USER } from '../tokens';
import { hasAccess } from '../utils';

@Directive({
	selector: '[slsUiHasAccess]',
	standalone: true,
})
export class HasAuthorityDirective implements OnInit {
	private readonly viewContainer = inject(ViewContainerRef);
	private readonly templateRef = inject(TemplateRef);
	private readonly currentUser$ = inject(SLS_UI_CURRENT_USER);
 
	readonly requiredAuthorities = input.required<(string | SlsUserAuthority)[]>({
		alias: 'hasAccess',
	});

	ngOnInit(): void {
		this.toggleView();
	}

	private async toggleView(): Promise<void> {
		const currentUser = await firstValueFrom(this.currentUser$);
		if (hasAccess(this.requiredAuthorities(), currentUser)) {
			this.viewContainer.createEmbeddedView(this.templateRef);
		} else {
			this.viewContainer.clear();
		}
	}
}
