import {test as base, expect, APIRequestContext} from '@playwright/test';
import {KiotvietClient} from '../api/clients/kiotviet.client';
import {ProductService} from '../api/services/product.service';

type ApiFixtures = {
    kiotvietClient: KiotvietClient;
    productService: ProductService;
}

export const test = base.extend<ApiFixtures>({
    kiotvietClient: async ({request}, use) => {
        const client = new KiotvietClient(request);
        await use(client);
    },

    productService: async ({kiotvietClient}, use) => {
        const service = new ProductService(kiotvietClient);
        await use(service);
    },
})

export {expect} from '@playwright/test';