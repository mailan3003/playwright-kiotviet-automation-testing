import {APIResponse} from '@playwright/test';
import {KiotvietClient} from '../clients/kiotviet.client';
import {
    CreateProductPayload,
    CreateProductResponse,
} from '../types/product.types';

export class ProductService {
    constructor(private client: KiotvietClient) {

    }

    async createProduct(product: Partial< CreateProductPayload >): Promise<APIResponse> {
        const productPayload = this.buildProductPayload(product);
        const formData: Record<string, string> = {
            ListBranchsSelected: '[]',
            isAddFromOtherForm: 'false',
            ListProductsString: JSON.stringify([productPayload]),
            CloneProductId: '0',
            DeletedImageId: '',
            ProductImageSuggestUrl: '',
            IsRetailerMedicine: 'undefined',
            IsSyncNationalPharmacy: 'false',
            IsUpdateAllSystem: 'true',
            BranchForProductCostss: JSON.stringify([
                { Id: 333, Name: 'Chi nhánh trung tâm' },
            ]),
        };

        return this.client.postMultipart(
            '/api/products/addmany?apiversion=5', 
            formData
        );
    }

    private buildProductPayload(override: Partial<CreateProductPayload>): CreateProductPayload {
        const defaults: CreateProductPayload = {
            Id: 0,
            ProductType: 2,
            CategoryId: 662375,
            CategoryName: '',
            isActive: false,
            AllowsSale: true,
            Code: '',
            BasePrice: 0,
            Cost: 0,
            Name: '',
            RewardPoint: 0,
            Description: '',
            ConversionValue: 1,
        }
        return {...defaults, ...override};
    }

    async parseCreateResponse( response: APIResponse): Promise<CreateProductResponse> {
        return response.json();
    }

}