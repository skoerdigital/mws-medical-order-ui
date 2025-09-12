export type ApiEndpoints<ApiService> = {
	[K in keyof ApiService]: string | ((...query: string[]) => string) | ((request: Record<string, any>) => string) | ((request: { [key: string]: any }) => string);
};
