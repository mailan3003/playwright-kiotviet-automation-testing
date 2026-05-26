import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';
import {expect} from '@playwright/test';

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
    readonly buttonAgreeUnit: Locator;
    readonly buttonAgreeGiaVon: Locator;

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
        this.buttonAgreeUnit = page.locator('#filterMultiInvoices .kv-btn-confirm');
        this.buttonAgreeGiaVon = page.locator('[kendo-window="productCostScopeWindow"]').locator('a.kv-btn-primary');
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

    async clickButtonAgreeUnit(): Promise<void> {
        await expect(this.buttonAgreeUnit).toBeVisible({ timeout: 5000 });
        await this.buttonAgreeUnit.click();
        await expect(this.buttonAgreeUnit).not.toBeVisible({ timeout: 10000 });
    }

    async clickButtonAgreeGiaVon(): Promise<void> {
        await expect(this.buttonAgreeGiaVon).toBeAttached({ timeout: 5000 });
        await this.buttonAgreeGiaVon.click({ force: true });
        await expect(this.buttonAgreeGiaVon).not.toBeAttached({ timeout: 10000 });
        await this.page.locator('alert').waitFor({ state: 'hidden' });
    }

    async verifyProductCreated(tenHang: string, giaVon: string, giaBan: string): Promise<void> {
        // ✅ Chờ alert biến mất
        await this.page.locator('alert').waitFor({ state: 'hidden' });

        const formattedGiaVon = Number(giaVon).toLocaleString('en-US');
        const formattedGiaBan = Number(giaBan).toLocaleString('en-US');

        // ✅ Dùng expect — tự chờ, không cần isVisible()
        await expect(this.page.getByRole('gridcell').filter({ hasText: tenHang }).first()).toBeVisible();
        await expect(this.page.getByRole('gridcell').filter({ hasText: formattedGiaVon }).first()).toBeVisible();
        await expect(this.page.getByRole('gridcell').filter({ hasText: formattedGiaBan }).first()).toBeVisible();
    }

}