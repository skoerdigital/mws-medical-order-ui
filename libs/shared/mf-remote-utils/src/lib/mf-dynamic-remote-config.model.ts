export type MFDynamicRemoteConfig = Record<
	string,
	{
		remoteUrl: string;
		exposes: string;
		routePath: string;
		displayName: string;
	}
>;
