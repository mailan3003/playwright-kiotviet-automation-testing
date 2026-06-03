// import {test} from '../../../fixtures';
import { apiTest, expect } from '../../../fixtures';         
import {ProductBuilder} from '../../../api/builders/product.builder';

apiTest.describe('Create Product API - Tạo sản phẩm', () => {
    apiTest ('T01 - Tạo sản phẩm thành công với data hợp lệ', async ({productService}) => {
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
        expect(created.BasePrice).toBe(250000);
        expect(created.Id).toBeGreaterThan(0);
        expect(created.Code).toMatch(/^SP\d+$/);  // format SP + số
        expect(created.isActive).toBe(true);
        expect(created.isDeleted).toBe(false);
    })
})

apiTest.describe('Create Product API - Với Login Trước', () => {
    apiTest('T01 - Tạo sản phẩm (token tự động từ login)', 
        async ({ productService, apiToken }) => {
            //                     ↑ Token lấy từ fixture!
            
            console.log(`Using token: ${apiToken.substring(0, 20)}...`);

            const newProduct = new ProductBuilder()
                .withName('Cà phê sữa đá test')
                .withPrice(250000, 15000)
                .build();

            const response = await productService.createProduct(newProduct);
            // ↑ productService đã có token từ env (gán trong fixture)

            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body.Data[0].Name).toBe('Cà phê sữa đá test');
        }
    );
});