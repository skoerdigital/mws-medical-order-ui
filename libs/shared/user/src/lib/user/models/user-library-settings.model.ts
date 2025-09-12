import { LibrarySettings } from '@sls-ui/models';

export type SlsUserLibrarySettings<T> = Pick<
	LibrarySettings<T>,
	'apiEndpoints'
>;
