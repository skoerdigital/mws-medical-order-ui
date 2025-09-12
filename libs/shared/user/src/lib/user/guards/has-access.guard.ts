import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { SlsUserAuthority } from '../models';
import { SLS_UI_CURRENT_USER } from '../tokens';
import { hasAccess } from '../utils';

export function hasAccessGuard(
	authorities: (string | SlsUserAuthority)[],
): CanActivateFn {
	return async () => {
		const currentUser = await lastValueFrom(inject(SLS_UI_CURRENT_USER));
		return hasAccess(authorities, currentUser);
	};
}
