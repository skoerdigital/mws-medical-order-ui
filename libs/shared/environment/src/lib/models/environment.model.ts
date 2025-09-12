import { ApiEndpoints } from '@sls-ui/models';

export interface SlsEnvironment<Endpoints = unknown> {
	production: boolean;
	apiEndpoints?: ApiEndpoints<Endpoints>;
}
