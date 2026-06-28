export interface Customer {
    BranchId: number;
    IsActive: boolean;
    Uuid: string;
    MaskContactNumber: string;
    MaskSubNumber: string;
    MaskContactNumberEInvoice: string;
    Type: number;
    temploc: string;
    tempw: string;
    EmployeeInChargeIds: [];
    BankCode: string | null;
    BankName: string | null;
    BankNameEinv: string | null;
    BankAccountId: string | null;
    Name: string;
    Organization: string;
    NameEInvoice: string;
    ContactNumber: string;
    ContactNumberEInvoice: string;
    BirthDate: string;
    Gender: number;
    Email: string;
    EmailEInvoice: string;
    Address: string;
    LocationName: string;
    WardName: string;
    LocationId: number;
    WardId: number;
    AdministrativeAreaId: null;
    CustomerGroupDetails: [];
    RetailerId: number

}

export interface CreateCustomerRequest {
    Customer: Customer;
    isMergedSupplier: boolean;
    isCreateNewSupplier: boolean;
    MergedSupplierId: number | null;
    SkipValidateEmail: boolean;
    UseCustomValidation: boolean
}