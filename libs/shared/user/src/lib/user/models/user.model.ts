export enum SlsUserAuthority {
	PROPERTY_CLAIM_PARTICIPANT_VIEWER,
}

export interface SlsUser {
	authorities: (string | SlsUserAuthority)[];
	displayName: string;
	login: string;
}
