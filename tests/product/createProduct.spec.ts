import {test, expect} from '@playwright/test';
import {ProductPage} from '../../pages/ProductPage';

test.describe('Create Product', () => {
    let productPage: ProductPage;

    test.beforeEach(async ({page}) => {
        productPage = new ProductPage(page);
        await productPage.navigateToProductPage();
        await productPage.openCreateProductPopup();
    })

    test('T01: Create new product with valid data', async ({page}) => {
        const randomNum = Math.floor(Math.random()*1000);
        const tenHang = `Sản phẩm ${randomNum}`;
        const giaVon = `${randomNum}000`;
        const giaBan = `${randomNum}999`;
        await productPage.fillFullProductInfo(tenHang, giaVon, giaBan);
        await productPage.saveProduct();
        await productPage.clickButtonAgreeUnit();
        await productPage.clickButtonAgreeGiaVon();

        //Verify product is created successfully
        await expect(productPage.verifyProductCreated(tenHang)).toBeVisible();
        await expect(productPage.verifyProductCreated(productPage.formatNumber(giaVon))).toBeVisible();
        await expect(productPage.verifyProductCreated(productPage.formatNumber(giaBan))).toBeVisible();

    })
})