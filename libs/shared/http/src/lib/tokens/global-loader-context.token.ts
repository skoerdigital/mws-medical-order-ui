import { HttpContextToken } from '@angular/common/http';

export const GLOBAL_LOADER_CONTEXT_TOKEN = new HttpContextToken(() => ({}));
