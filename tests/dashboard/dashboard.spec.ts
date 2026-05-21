import {test, expect} from '@playwright/test';
import { Login } from '../../utils/auth.helper';

test.describe('Dashboard', () => {
    test.beforeEach(async({page}) => {
        await Login(page, 'admin', 'Kiotviet123456');
    })

    test('Verify dashboard screen', async({page}) => {  

        await expect(page.getByRole('link', { name: 'Tổng quan' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Kết quả bán hàng hôm nay' })).toBeVisible();
        await expect(page.getByText('Doanh thu', { exact: true })).toBeVisible();
        await expect(page.locator('label').filter({ hasText: 'Trả hàng' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Top 10 hàng bán chạy' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Top 10 khách mua nhiều nhất' })).toBeVisible();
        await expect(page.getByText('Hoạt động gần đây')).toBeVisible();
        await expect(page.locator('a').filter({ hasText: 'Hàng hóa' }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: /Bán hàng/})).toBeEnabled();
    })

    test('Verify navigation menu', async({page}) => {
        const menuItems = [
            'Tổng quan',
            'Hàng hóa',
            'Mua hàng',
            'Đơn hàng',
            'Khách hàng',
            'Bác sĩ',
            'Nhân viên',
            'Sổ quỹ',
            'Phân tích',
            'Bán online',
            'Thuế & Kế toán'
        ]

        for (let index = 0; index < menuItems.length; index++) {
            await expect(page.locator('a').filter( {hasText: menuItems[index]}).first()).toBeVisible();
        }

        await expect(page.locator('a').filter({ hasText: 'Tổng quan' }).first()).toHaveClass(/active/);
    })

    test('Verify Doanh thu thuần & filter tab', async ({page}) => {
        await expect(page.getByRole('heading', { name: 'Doanh thu thuần' })).toBeVisible();
        const filterTabs = [
            'Theo ngày',
            'Theo giờ',
            'Theo thứ'
        ]
        for (let index = 0; index < filterTabs.length; index++) {
            await expect(page.getByText(filterTabs[index])).toBeVisible();
        }
        await expect(page.getByText('Theo ngày')).toHaveClass(/active/);
        await expect(page.getByText('Theo giờ')).not.toHaveClass(/active/);
        await expect(page.getByText('Theo thứ')).not.toHaveClass(/active/);
        
        //Check click vào filter Theo giờ
        await page.getByText('Theo giờ').click();
        await expect(page.getByText('Theo ngày')).not.toHaveClass(/active/);
        await expect(page.getByText('Theo giờ')).toHaveClass(/active/);
        await expect(page.getByText('Theo thứ')).not.toHaveClass(/active/);

        //Check click vào filter Theo thứ
        await page.getByText('Theo thứ').click();
        await expect(page.getByText('Theo ngày')).not.toHaveClass(/active/);
        await expect(page.getByText('Theo giờ')).not.toHaveClass(/active/);
        await expect(page.getByText('Theo thứ')).toHaveClass(/active/);
    })

    test('Verify url when click menu items', async ({page}) => {
        // 1. Verify đang ở Dashboard
        await expect(page).toHaveURL(/DashBoard/);

        // 2. Click menu "Hàng hóa"
        await page.locator('a').filter({hasText: 'Hàng hóa'}).first().click();    
        await page.getByRole('link', { name: 'Danh sách hàng hóa' }).click();

        // 3. Verify URL thay đổi
        await expect(page).toHaveURL(/Products/);
            
        // 4. Verify menu "Hàng hóa" active
        await expect(page.locator('a').filter({hasText: 'Hàng hóa'}).first()).toHaveClass(/active/);

        // 5. Verify "Tổng quan" không còn active
        await expect(page.getByRole('link', { name: 'Tổng quan' })).not.toHaveClass(/active/);
        // 6. Quay lại Dashboard
        await page.getByRole('link', { name: 'Tổng quan' }).click();

        // 7. Verify về lại Dashboard
        await expect(page.getByRole('link', { name: 'Tổng quan' })).toHaveClass(/active/);
        await expect(page.locator('a').filter({hasText: 'Hàng hóa'}).first()).not.toHaveClass(/active/);
    })
})