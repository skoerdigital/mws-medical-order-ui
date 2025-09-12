import { SlsUser, SlsUserAuthority } from '../models';

export const hasAccess = (
	authorities: (string | SlsUserAuthority)[],
	currentUser: SlsUser,
): boolean => {
	if (!currentUser?.authorities) {
		return false;
	}

	return authorities.some((authority) =>
		currentUser.authorities.includes(authority),
	);
};
