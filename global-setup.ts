import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://testz18.kiotviet.vn/man/#/login');
    await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('admin');
    await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Kiotviet123456');
    await page.getByRole('button', { name: 'Quản lý' }).click();
    await page.waitForURL('https://testz18.kiotviet.vn/man/#/DashBoard');

    await page.context().storageState({path: '.auth/kiotviet.json'});
    await browser.close();
}

export default globalSetup;