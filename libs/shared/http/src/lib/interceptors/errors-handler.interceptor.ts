import {
	HttpContext,
	HttpContextToken,
	HttpErrorResponse,
	HttpEvent,
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { Observable, tap } from 'rxjs';

type ErrorHandlerFn = (error: string) => void;
type ClassType = new (...args: any) => any;
type ErrorHandlerFnFactory<
	T extends ClassType,
	ErrorFn extends ErrorHandlerFn,
> = (dependency?: InstanceType<T>) => ErrorFn;
type ErrorHandlerInterceptorConfig<FnType extends ClassType> = (
	| {
			mode: 'error';
			getErrorMessage: (error: HttpErrorResponse) => string;
	  }
	| {
			mode: 'complete';
			getErrorMessage: <T>(response: HttpResponse<T>) => string;
	  }
) & {
	inject?: FnType;
	handleErrorFnFactory: ErrorHandlerFnFactory<FnType, ErrorHandlerFn>;
};
type ErrorHandlerContextOptions<T extends ClassType> = {
	context?: HttpContext;
} & ErrorHandlerInterceptorConfig<T>;

const withErrorHandlerInterceptor =
	<T extends ClassType>(
		config: ErrorHandlerInterceptorConfig<T>,
	): HttpInterceptorFn =>
	(...args): Observable<HttpEvent<unknown>> => {
		if (!config.inject) {
			return errorHandlerInterceptor(...args, config);
		}

		return errorHandlerInterceptor<T>(...args, {
			...config,
			handleErrorFnFactory: getHandleErrorFnFactoryWithResolvedDep(config),
		});
	};

const getHandleErrorFnFactoryWithResolvedDep = <T extends ClassType>(
	config: Pick<
		ErrorHandlerInterceptorConfig<T>,
		'handleErrorFnFactory' | 'inject'
	>,
): ErrorHandlerInterceptorConfig<T>['handleErrorFnFactory'] => {
	const handleErrorFnFactory = config.handleErrorFnFactory.bind(
		null,
		inject(config.inject!),
	);
	return handleErrorFnFactory;
};

const defaultGetErrorMessageFn = ({
	statusText,
}: HttpResponse<unknown> & HttpErrorResponse): string => statusText;

const defaultHandleErrorFn = (error: string): void => {
	console.error(`Error handler message: ${error}`);
};

const ERROR_HANDLER = new HttpContextToken<
	Partial<ErrorHandlerContextOptions<ClassType>>
>(() => ({}));

const withErrorHandlerContext = <T extends ClassType>(
	options: Partial<ErrorHandlerContextOptions<T>> = {},
): HttpContext => {
	const { context: existingContext, ...errorHandlerOptions } = options;
	return (existingContext ?? new HttpContext()).set(ERROR_HANDLER, {
		...errorHandlerOptions,
	});
};

const errorHandlerInterceptor = <T extends ClassType>(
	request: HttpRequest<unknown>,
	next: HttpHandlerFn,
	globalConfig: ErrorHandlerInterceptorConfig<T>,
): Observable<HttpEvent<unknown>> => {
	const { context } = request;

	if (!context.has(ERROR_HANDLER)) {
		return next(request);
	}

	const configFromHttpContext = context.get(ERROR_HANDLER);
	const config = { ...globalConfig, ...configFromHttpContext };
	const {
		mode = 'error',
		handleErrorFnFactory,
		getErrorMessage = defaultGetErrorMessageFn,
	} = {
		...config,
		handleErrorFnFactory: config.inject
			? getHandleErrorFnFactoryWithResolvedDep({
					inject: config.inject,
					handleErrorFnFactory: config.handleErrorFnFactory,
				})
			: config.handleErrorFnFactory,
	};
	const handleErrorFn = handleErrorFnFactory?.() || defaultHandleErrorFn;

	return next(request).pipe(
		tap({
			next: (httpEvent) => {
				if (mode === 'complete' && httpEvent instanceof HttpResponse) {
					// TODO: point out what signifies error in terms of complere state
					handleErrorFn(getErrorMessage(httpEvent as any));
				}
			},
			error: (error) => {
				if (mode === 'error') {
					handleErrorFn(config.getErrorMessage(error));
				}
			},
		}),
	);
};

export { withErrorHandlerContext, withErrorHandlerInterceptor };
