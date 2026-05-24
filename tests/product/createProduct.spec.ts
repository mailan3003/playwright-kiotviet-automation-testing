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
        const giaVon = '100000';
        const giaBan = '200000';
        await productPage.fillFullProductInfo(tenHang, giaVon, giaBan);
        await productPage.saveProduct();
        await productPage.clickButtonAgree();

        //Verify product is created successfully
       expect(await productPage.isProductCreatedWithTenHang(tenHang)).toBeTruthy();
       expect(await productPage.isProductCreatedWithGiaVon(giaVon)).toBeTruthy();
       expect(await productPage.isProductCreatedWithGiaBan(giaBan)).toBeTruthy();
    })
})