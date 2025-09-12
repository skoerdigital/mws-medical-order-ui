import {
	HttpContext,
	HttpEvent,
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { Observable, Subject, finalize, tap } from 'rxjs';

import { GlobalLoaderSettings } from '../models';
import { GLOBAL_LOADER_CONTEXT_TOKEN, GLOBAL_LOADER_SETTINGS } from '../tokens';

const globalLoaderInterceptor = <T>(
	request: HttpRequest<unknown>,
	next: HttpHandlerFn,
	settingsSubject: Subject<GlobalLoaderSettings<T>>,
	componentClass: GlobalLoaderSettings<T>['componentClass'],
	componentSettings?: GlobalLoaderSettings<T>['componentSettings'],
): Observable<HttpEvent<unknown>> => {
	if (!request.context.has(GLOBAL_LOADER_CONTEXT_TOKEN)) {
		return next(request);
	}

	const componentParams = { componentClass, componentSettings };
	const request$ = next(request).pipe(
		tap({
			next: () => {
				settingsSubject.next({ ...componentParams, isShown: true });
			},
			error: () => {
				settingsSubject.next({ ...componentParams, isShown: false });
			},
		}),
		finalize(() =>
			settingsSubject.next({ ...componentParams, isShown: false }),
		),
	);

	return request$;
};

const withGlobalLoaderContext = ({
	context: existingContext,
}: { context?: HttpContext } = {}): HttpContext => {
	return (existingContext ?? new HttpContext()).set(
		GLOBAL_LOADER_CONTEXT_TOKEN,
		{},
	);
};

const withGlobalLoaderInterceptor =
	<T>({
		componentSettings,
		componentClass,
	}: Pick<
		GlobalLoaderSettings<T>,
		'componentSettings' | 'componentClass'
	>): HttpInterceptorFn =>
	(
		request: HttpRequest<unknown>,
		next: HttpHandlerFn,
	): Observable<HttpEvent<unknown>> => {
		const settingsSubject = inject(GLOBAL_LOADER_SETTINGS);
		settingsSubject.next({ componentClass, componentSettings, isShown: false });
		return globalLoaderInterceptor(
			request,
			next,
			settingsSubject,
			componentClass,
			componentSettings,
		);
	};

export { withGlobalLoaderInterceptor, withGlobalLoaderContext };
