import { HttpClient } from "@angular/common/http";

export interface AuthSettings {
	getAuthUrlFn: (httpClient: HttpClient) => Promise<string>;
	getIsAutorisedFn?: (httpClient: HttpClient) => Promise<boolean>;
	redirectUrlStoreKey: string;
	redirectUrlStorage: Storage;
}

export interface AuthSettingsParams {
	getAuthUrlFn: (httpClient: HttpClient) => Promise<string>;
	getIsAutorisedFn?: (httpClient: HttpClient) => Promise<boolean>;
	redirectUrlStoreKey?: string;
	redirectUrlStorage?: Storage;
}
