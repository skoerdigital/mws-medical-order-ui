import { ApiEndpoints } from '@sls-ui/models';

export interface SlsEnvironment<Endpoints = unknown> {
	baseUrl: string;
	production: boolean;
	apiEndpoints?: ApiEndpoints<Endpoints>;
}
