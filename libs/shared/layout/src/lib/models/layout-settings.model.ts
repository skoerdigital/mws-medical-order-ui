import { MenuItem } from 'primeng/api';

import { LibrarySettings } from '@sls-ui/models';

export interface HeaderSettings {
	title: string;
	logoUrl: string;
	currentUser: string;
}

interface SidemenuSettings {
	items?: MenuItem[] | null;
}

interface FooterSettings {
	copyrightText: string;
}

export interface LayoutSettings extends LibrarySettings {
	header: HeaderSettings;
	sidemenu: SidemenuSettings;
	footer: FooterSettings;
}
