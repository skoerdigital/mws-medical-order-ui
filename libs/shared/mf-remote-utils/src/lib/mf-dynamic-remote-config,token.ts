import { InjectionToken } from '@angular/core';

import { MFDynamicRemoteConfig } from './mf-dynamic-remote-config.model';
import { MFDynamicRemotes } from './mf-dynamic-remotes.model';

export const MF_DYNAMIC_REMOTE_CONFIG = new InjectionToken<
	MFDynamicRemotes<MFDynamicRemoteConfig>
>('MF_DYNAMIC_REMOTE_CONFIG');
