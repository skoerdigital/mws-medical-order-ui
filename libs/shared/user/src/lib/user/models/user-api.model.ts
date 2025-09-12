import { Observable } from 'rxjs';

import { SlsUser } from './user.model';

export interface UserApi {
	getCurrentUserInfo(): Observable<SlsUser | null>;
}
