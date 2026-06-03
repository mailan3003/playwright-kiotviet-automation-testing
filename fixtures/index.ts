// import {test as base, expect, APIRequestContext, mergeTests} from '@playwright/test';
import {KiotvietClient} from '../api/clients/kiotviet.client';
import {ProductService} from '../api/services/product.service';
// import {authTest} from './auth.fixtures';
import {apiAuthTest} from './api-auth.fixtures';

type ApiFixtures = {
    kiotvietClient: KiotvietClient;
    productService: ProductService;
}

export const apiTest = apiAuthTest.extend<ApiFixtures>({
    kiotvietClient: async ({request, apiToken}, use) => {
        // Tạo instance client với token đã lấy được
        const client = new KiotvietClient(request, apiToken);
        await use(client);
    },

    productService: async ({kiotvietClient}, use) => {
        const service = new ProductService(kiotvietClient);
        await use(service);
    },
});

export {expect} from '@playwright/test';