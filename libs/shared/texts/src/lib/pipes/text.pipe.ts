import { Pipe, PipeTransform, inject } from '@angular/core';

import lodash from 'lodash';

import { TEXTS } from '../providers';

@Pipe({
	name: 'slsUiText',
	standalone: true,
})
export class SlsUiTextPipe implements PipeTransform {
	private readonly texts = inject(TEXTS, { optional: true });
	private readonly defaultFallback = 'No value for this text key is provided';

	constructor() {
		if (!this.texts) {
			console.warn(
				'No texts token is found on injector, pipe will be using default fallback.',
			);
		}
	}

	/**
	 * Transforms the given text key into the corresponding text value.
	 * @param value The text key to transform.
	 * @param fallback The fallback text to use if the key is not found. If null, no fallback is used.
	 * @returns The transformed text value or the fallback text if the key is not found.
	 */
	transform(value: string, fallback?: string | null): string {
		if (!value) {
			return 'No key provided';
		}

		if (!this.texts) {
			return `${value}${
				fallback === null ? '' : `(${fallback || this.defaultFallback})`
			}`;
		}

		return lodash.get(
			this.texts,
			value,
			`${value}${
				fallback === null ? '' : ` (${fallback || this.defaultFallback})`
			}`,
		) as string;
	}
}
