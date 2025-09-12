import { Router } from '@angular/router';

export const handleLogin = (
	router: Router,
	redirectUrlStorage: Storage,
	redirectUrlStoreKey: string,
	authUrl: string,
): void => {
	const getCurrentUrl = (): string =>
		router.routerState.snapshot.url || location.pathname;
	redirectUrlStorage.setItem(redirectUrlStoreKey, getCurrentUrl());
	location.assign(authUrl);
};
