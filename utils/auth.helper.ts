import { expect, Page } from "@playwright/test";
export async function Login(page: Page, username: string, password: string) {
        await page.goto('https://testz18.kiotviet.vn/man/#/login')
        await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill(username);
        await page.getByRole('textbox', { name: 'Mật khẩu' }).fill(password);

        await page.getByRole('button', { name: 'Quản lý' }).click();

        await expect(page).toHaveURL('https://testz18.kiotviet.vn/man/#/DashBoard');

}