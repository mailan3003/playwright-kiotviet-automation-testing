import {test, expect, request} from "@playwright/test"
import { CustomerService } from "../../../api/services/customer.service"
import { CustomerBuilder } from "../../../api/builders/customer.builder";
import { ApiClient } from "../../../api/clients/customer.client";
import customers from "../../../data/customer.json"

test.describe('Test tạo khách hàng', async() => {
    for(const customer of customers){
        test(`Create customer ${customer.name}`, async () => {

            const apiContext = await request.newContext();
            const apiClient = new ApiClient(apiContext);
            const customerService = new CustomerService(apiClient);
            const body = new CustomerBuilder().withName(customer.name).build();
            const response = await customerService.create(body);
            expect(response.status()).toBe(200);
        });
    }
})