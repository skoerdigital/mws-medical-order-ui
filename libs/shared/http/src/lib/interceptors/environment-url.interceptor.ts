import {
	HttpEvent,
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpRequest,
} from '@angular/common/http';
import { InjectionToken, inject } from '@angular/core';

import { Observable } from 'rxjs';

export const environmentUrlInterceptor = (
	request: HttpRequest<unknown>,
	next: HttpHandlerFn,
	baseUrl: string,
): Observable<HttpEvent<unknown>> => {
	const clonedRequest = request.clone({
		url: `${baseUrl}${request.url}`,
	});

	return next(clonedRequest);
};

export const withEnvironmentUrlInterceptor =
	(
		baseUrlOrToken: string | InjectionToken<{ baseUrl: string }>,
	): HttpInterceptorFn =>
	(
		request: HttpRequest<unknown>,
		next: HttpHandlerFn,
	): Observable<HttpEvent<unknown>> => {
		if (typeof baseUrlOrToken === 'string') {
			const baseUrl = baseUrlOrToken;
			return environmentUrlInterceptor(request, next, baseUrl);
		}

		const token = baseUrlOrToken;
		return environmentUrlInterceptor(request, next, inject(token).baseUrl);
	};
