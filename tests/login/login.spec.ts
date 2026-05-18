import {test, expect} from '@playwright/test'

test.describe('Login to dashboard', () => {
    test.beforeEach(async({page}) => {
        await page.goto('https://testz18.kiotviet.vn/man/#/login')
    })

    test('Verify login screen', async({page}) => {
        await expect(page.getByRole('textbox', { name: 'Tên đăng nhập' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Mật khẩu' })).toBeVisible();
        await expect(page.getByRole('checkbox', { name: 'Duy trì đăng nhập' })).toBeChecked();
        await expect(page.getByRole('link', { name: 'Quên mật khẩu?' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Quản lý' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Bán hàng' })).toBeVisible();
    })

    test('Login sucessfully by management', async({page}) => {

        await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('admin');
        await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Kiotviet123456');

        await page.getByRole('button', { name: 'Quản lý' }).click();

        await expect(page).toHaveURL('https://testz18.kiotviet.vn/man/#/DashBoard')
    })

    test('Login sucessfully by sell', async({page}) => {

        await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('admin');
        await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Kiotviet123456');

        await page.getByRole('button', { name: 'Bán hàng' }).click();

        await expect(page).toHaveURL('https://testz18.kiotviet.vn/sale/#/')
    })

    test('Login unsucessfully by wrong password', async({page}) => {

        await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('admin');
        await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('wrongpassword');

        await page.getByRole('button', { name: 'Quản lý' }).click();

        await expect(page.getByText('Sai tên đăng nhập hoặc mật khẩu.')).toBeVisible()
    })

    test('Verify remember login unchecked', async ({ page }) => {
        // 1. Login với checkbox UNCHECKED
        await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('admin');
        await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Kiotviet123456');
        await page.getByText('Duy trì đăng nhập').click();
        await page.getByRole('button', { name: 'Quản lý', exact: false }).click();

        // 2. Verify login thành công
        await expect(page).toHaveURL(/DashBoard/);

        // 3. Logout — bạn thay selector đúng với app KiotViet
        await page.getByRole('link', { description: 'admin', exact: true }).click();
        await page.locator('a').filter({ hasText: 'Đăng xuất' }).click();

        // 4. Verify về trang login
        await expect(page).toHaveURL(/login/);

        // 5. Verify username field trống
        await expect(
            page.getByRole('textbox', { name: 'Tên đăng nhập' })
        ).toHaveValue('');
    });

})