import { ApiEndpoints } from '@sls-ui/models';

import { UserApi } from '../models/user-api.model';

export const USER_API_DEFAULT_ENDPOINTS = {
	getCurrentUserInfo: '/self/users/me',
} satisfies ApiEndpoints<UserApi>;
