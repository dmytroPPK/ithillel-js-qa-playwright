import {test as base } from '@playwright/test'
import  { chromium } from '@playwright/test'
import {GaragePage} from '../pages/GaragePage.mjs'


export const test = base.extend({
	

    garagePage: async ({}, use) => {
        const chrome = await chromium.launch({ headless: false });
		const context = await chrome.newContext({ storageState: 'tests/store/user-garage.json' });
		const page = await context.newPage();
		await use(new GaragePage(page));
    }
});
