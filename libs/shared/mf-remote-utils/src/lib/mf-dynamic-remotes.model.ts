import { MFDynamicRemoteConfig } from './mf-dynamic-remote-config.model';

export type MFDynamicRemotes<T extends MFDynamicRemoteConfig> = {
	[P in keyof T]: {
		routePath: T[P]['routePath'];
		displayName: T[P]['displayName'];
	};
};
