import {
	APP_BASE_HREF,
	LocationStrategy,
	PathLocationStrategy,
	PlatformLocation,
} from '@angular/common';
import { Inject, Injectable, Optional, Provider } from '@angular/core';
import { UrlSerializer } from '@angular/router';

@Injectable()
export class PreserveQueryLocationStrategy extends PathLocationStrategy {
	constructor(
		protected readonly platformLocation: PlatformLocation,
		protected readonly urlSerializer: UrlSerializer,
		@Optional() @Inject(APP_BASE_HREF) baseHref?: string,
	) {
		super(platformLocation, baseHref);
	}

	override prepareExternalUrl(internal: string): string {
		const path = super.prepareExternalUrl(internal);
		const urlTree = this.urlSerializer.parse(path);

		const current = new URLSearchParams(
			(this as any).platformLocation.search || '',
		);

		const merged = {
			...Object.fromEntries(Array.from(current.entries())), // OK dla TS
			...urlTree.queryParams,
		};

		urlTree.queryParams = merged;
		return urlTree.toString();
	}
}

export const provideQueryLocationStrategy = (): Provider => {
	return {
		provide: LocationStrategy,
		useClass: PreserveQueryLocationStrategy,
	};
};
