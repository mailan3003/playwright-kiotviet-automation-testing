import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';

export class ProductPage extends BasePage {
    readonly productMenu: Locator;
    readonly productListMenu: Locator
    readonly createNewButton: Locator;
    readonly createProductButton: Locator;
    readonly tenHangInput: Locator;
    readonly nhomHangDropdown: Locator;
    readonly giaVonInput: Locator;
    readonly giaBanInput: Locator;
    readonly saveButton: Locator;
    readonly buttonAgree: Locator;


    constructor(page: Page){
        super(page);
        this.productMenu = page.locator('a').filter({ hasText: 'Hàng hóa' }).first();
        this.productListMenu = page.getByRole('link', { name: 'Danh sách hàng hóa' });
        this.createNewButton = page.getByRole('link', { name: '+ Tạo mới ' })
        this.createProductButton = page.locator('a').filter({ hasText: /^Hàng hóa$/ });
        this.tenHangInput = page.locator('#idSuggestProductNameSearchTerm');
        this.nhomHangDropdown = page.getByText('Chọn nhóm hàng (Bắt buộc)').first();
        this.giaVonInput = page.locator('.iptPriceCost');
        this.giaBanInput = page.locator('#iptBasePriceMaster');
        this.saveButton = page.getByRole('link', { name: 'Lưu', exact: true });
        this.buttonAgree = page.locator('#filterMultiInvoices').getByRole('button', { name: 'Đồng ý' });
    }

    //Navigate to product page
    async navigateToProductPage(): Promise<void> {
        await this.page.goto('/man/#/Products');
        await this.productMenu.click();
        await this.productListMenu.click();
    }

    //open popup create new product
    async openCreateProductPopup(): Promise<void> {
        await this.createNewButton.click();
        await this.createProductButton.click();
    }

    async fillProductNameInfo(tenHang: string): Promise<void> {
        await this.tenHangInput.fill(tenHang);
        await this.tenHangInput.press('Enter');
    }

    async fillGiaVon(giaVon: string): Promise<void> {
        await this.giaVonInput.fill(giaVon);
    }

    async fillGiaBan(giaBan: string): Promise<void> {
        await this.giaBanInput.fill(giaBan);
    }

    async chooseNhomHang(): Promise<void> {
        await this.nhomHangDropdown.nth(0).click();
        await this.page.getByRole('option').first().click();
    }
    
    async saveProduct(): Promise<void> {
        await this.saveButton.click();
    }

    async fillFullProductInfo(tenHang: string, giaVon: string, giaBan: string): Promise<void> {
        await this.fillProductNameInfo(tenHang);
        await this.chooseNhomHang();
        await this.fillGiaVon(giaVon);
        await this.fillGiaBan(giaBan);
    }

    async clickButtonAgree(): Promise<void> {
        await this.buttonAgree.click();
    }

    async isProductCreatedWithTenHang(tenHang: string): Promise<boolean> {
        const productRow = this.page.locator('tr').filter({ hasText: tenHang});
        return productRow.isVisible();
    }

    async isProductCreatedWithGiaVon(giaVon: string): Promise<boolean> {
        const productRow = this.page.locator('tr').filter({ hasText: giaVon});
        return productRow.isVisible();
    }

    async isProductCreatedWithGiaBan(giaBan: string): Promise<boolean> {
        const productRow = this.page.locator('tr').filter({ hasText: giaBan});
        return productRow.isVisible();
    }
}