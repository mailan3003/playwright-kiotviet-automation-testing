

export interface CreateProductPayload {
    Id: number;
    ProductType: number;
    CategoryId: number;
    CategoryName: string;
    isActive: boolean;
    AllowsSale: boolean;
    Code: string;
    BasePrice: number
    Cost: number;
    Name: string;
    RewardPoint: number;
    Description: string;
    ConversionValue: number;

}

export interface CreateProductResponse {
    Message: string;
    Data: ProductData[];
}

export interface ProductData {
    Id: number;
    Code: string;                 // Mã SP tự sinh (SP9934432363)
    Name: string;
    BasePrice: number;
    CategoryId: number;
    CreatedDate: string;
    isActive: boolean;
    isDeleted: boolean;
    RetailerId: number;
}

export interface CreateProductBodyForm {
    ListBranchsSelected: string;
    isAddFromOtherForm: string;
    ListProductsString: string;   // JSON stringify của CreateProductPayload[]
    CloneProductId: string;
    DeletedImageId: string;
    ProductImageSuggestUrl: string;
    IsRetailerMedicine: string;
    IsSyncNationalPharmacy: string;
    IsUpdateAllSystem: string;
    BranchForProductCostss: string;
}