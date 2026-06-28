import {test, expect, request} from "@playwright/test"
import { CustomerService } from "../../../api/services/customer.service"
import { CustomerBuilder } from "../../../api/builders/customer.builder";
import { ApiClient } from "../../../api/clients/customer.client";

test.describe('Test tạo khách hàng', async() => {
    test("Create customer", async () => {

        const apiContext = await request.newContext();
        const apiClient = new ApiClient(apiContext);
        const customerService = new CustomerService(apiClient);
        const body = new CustomerBuilder().build();
        const response = await customerService.create(body);
        expect(response.ok()).toBeTruthy();

    });
})