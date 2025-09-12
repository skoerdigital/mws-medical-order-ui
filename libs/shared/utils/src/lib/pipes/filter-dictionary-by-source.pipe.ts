import { Pipe, PipeTransform } from '@angular/core';

import { Observable, switchMap, tap } from 'rxjs';

import { DictionaryEntry } from '@sls-ui/models';

type StringOrNull = string | null;
type ValueType<T> = T extends Observable<infer U> ? U : never;
@Pipe({
	name: 'filterDictionaryBySource',
	standalone: true,
})
export class FilterDictionaryBySourcePipe<
	T extends DictionaryEntry | Record<string, unknown>,
> implements PipeTransform
{
	transform(
		entriesSource$: Observable<T[]>,
		sourceTriggerOrTriggers$: Observable<StringOrNull | StringOrNull[]>,
		filterHandler?: (value: ValueType<typeof sourceTriggerOrTriggers$>) => void,
	): Observable<T[]> {
		if (!sourceTriggerOrTriggers$) {
			return entriesSource$;
		}

		return sourceTriggerOrTriggers$.pipe(
			tap((value) => {
				filterHandler?.(value as ValueType<typeof sourceTriggerOrTriggers$>);
			}),
			switchMap(() => entriesSource$),
		);
	}
}
