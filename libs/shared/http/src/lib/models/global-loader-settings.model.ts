import { Type } from '@angular/core';

export interface GlobalLoaderSettings<T = any> {
	componentClass: Type<T>;
	componentSettings?: Partial<Record<keyof T, T[keyof T]>>;
	isShown: boolean;
}
