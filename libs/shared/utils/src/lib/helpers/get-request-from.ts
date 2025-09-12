import { DotPaths, PaginationProps, WithPagination } from '@sls-ui/models';

import {
	MappingValue,
	RequestToFormPropsMapper,
} from './get-request-from.model';

export function getRequestFromForm<Request, FormSchema, Form = never>(
	formValue: FormSchema,
	mapper: RequestToFormPropsMapper<Request, FormSchema, Form>,
): Request;
export function getRequestFromForm<Request, FormSchema, Form = never>(
	formValue: FormSchema,
	mapper: RequestToFormPropsMapper<Request, FormSchema, Form>,
	pagination: PaginationProps,
): WithPagination<Request>;

export function getRequestFromForm<Request, FormSchema, Form = never>(
	formValue: FormSchema,
	mapper: RequestToFormPropsMapper<Request, FormSchema, Form>,
	pagination?: PaginationProps,
): Request | WithPagination<Request> {
	const request = Object.keys(mapper).reduce((acc, key) => {
		const entryValue = getRequestEntryValue<Request, FormSchema, Form>(
			mapper[key as keyof Request],
			formValue,
		);
		return {
			...acc,
			...(entryValue ? { [key]: entryValue } : {}),
		};
	}, {} as Request);

	return {
		...request,
		...(pagination || {}),
	} as typeof pagination extends never ? Request : WithPagination<Request>;
}

const getFormValueAtPath = <FormSchema>(
	path: DotPaths<FormSchema>,
	formValue: FormSchema,
): FormSchema[keyof FormSchema] =>
	path.split('.').reduce(
		// @ts-expect-error: acc[path] gets to access FormSchema properties recursively in here.
		(acc, path) => acc?.[path],
		formValue as FormSchema[keyof FormSchema],
	);

const getRequestEntryValue = <Request, FormSchema, Form>(
	mappingValue: MappingValue<Request, FormSchema, Form>,
	formValue: FormSchema,
): Request[keyof Request] | FormSchema[keyof FormSchema] => {
	if (Array.isArray(mappingValue)) {
		const [formPath, transform] = mappingValue;
		const formValueAtPath = getFormValueAtPath(formPath, formValue);
		// @ts-expect-error: transform is a function that can be called with formValueAtPath.
		return transform ? transform(formValueAtPath) : formValueAtPath;
	}

	const formPath = mappingValue as DotPaths<FormSchema>;
	return getFormValueAtPath(formPath, formValue);
};
