import { ApiClient } from "../clients/customer.client";
import { CreateCustomerRequest } from "../types/customer.types";

export class CustomerService {
    constructor(private apiClient: ApiClient) {}
    create (body: CreateCustomerRequest){
        return this.apiClient.post(
            "/customers",
            body
        )
    }
}