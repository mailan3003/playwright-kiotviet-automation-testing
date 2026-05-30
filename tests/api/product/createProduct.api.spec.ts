import {test, expect} from '../../../fixtures';
import {ProductBuilder} from '../../../api/builders/product.builder';

test.describe('Create Product API - Tạo sản phẩm', () => {
    test ('T01 - Tạo sản phẩm thành công với data hợp lệ', async ({productService}) => {
        const newProduct = new ProductBuilder()
        .withName('Cà phê sữa đá test')
        .withPrice(250000, 15000)
        .withCategory(662375, 'Cà phê')
        .build();

        const response = await productService.createProduct(newProduct);
        expect(response.status()).toBe(200);
        
        const body = await productService.parseCreateResponse(response);
        expect(body.Message).toBe('Hàng hóa đã được tạo thành công');
        expect(body.Data).toHaveLength(1);

        const created = body.Data[0];
        expect(created.Name).toBe('Cà phê sữa đá test');
        expect(created.BasePrice).toBe(25000);
        expect(created.Id).toBeGreaterThan(0);
        expect(created.Code).toMatch(/^SP\d+$/);  // format SP + số
        expect(created.isActive).toBe(true);
        expect(created.isDeleted).toBe(false);
    })
})