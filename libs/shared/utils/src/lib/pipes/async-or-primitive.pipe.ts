import { Pipe, PipeTransform } from '@angular/core';

import { Observable, of } from 'rxjs';

@Pipe({
	standalone: true,
	name: 'slsUiAsyncOrPrimitive',
})
export class SlsUiAsyncOrPrimitivePipe<
	T,
	U extends T | Promise<T> | Observable<T>,
> implements PipeTransform
{
	transform(value: U): Promise<T> | Observable<T> {
		if (value instanceof Promise || value instanceof Observable) {
			return value;
		}
		return of(value as T);
	}
}
