import {test as base, BrowserContext, Page} from '@playwright/test';
import fs from 'fs';
import path from 'path';

type AuthFixtures = {
    authedPage: Page;
};

type WorkderAuthFixtures = {
    storageStatePath: string;
}

export const authTest = base.extend<AuthFixtures, WorkderAuthFixtures>({
    storageStatePath: [
        async ({browser}, use, workerInfo) => {
        const file = path.resolve (`.auth/worker-${workerInfo.workerIndex}.json`);
        if (!fs.existsSync(file)) {
            const context = await browser.newContext();
            const page = await context.newPage();

            // login logic bê nguyên từ globalSetup
            await page.goto('https://testz18.kiotviet.vn/man/#/login');
            await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('admin');
            await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Kiotviet123456');
            await page.getByRole('button', { name: 'Quản lý' }).click();
            await page.waitForURL('**/man/#/DashBoard');

            await context.storageState({ path: file });
            await context.close();
        }
        await use(file);
    }, {scope: 'worker'}
],

// TEST SCOPE: context sạch nhưng đã login
    authedPage: async ({browser, storageStatePath}, use) => {
        const context = await browser.newContext({storageState: storageStatePath});
        const page = await context.newPage();
        await use(page);
        await context.close();

    }
});