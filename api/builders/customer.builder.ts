import { faker } from "@faker-js/faker/locale/vi";
import { CreateCustomerRequest } from "../types/customer.types";

export class CustomerBuilder {
    build(
        overrides: Partial  <CreateCustomerRequest ["Customer"]> = {}
    ): CreateCustomerRequest{
        return{
            Customer: {
                "BranchId": 333,
                "IsActive": true,
                "Uuid": faker.string.uuid(),
                "MaskContactNumber": "",
                "MaskSubNumber": "",
                "MaskContactNumberEInvoice": "",
                "Type": 0,
                "temploc": "Thành phố Hà Nội",
                "tempw": "Phường Ba Đình",
                "EmployeeInChargeIds": [],
                "BankCode": null,
                "BankName": null,
                "BankNameEinv": null,
                "BankAccountId": null,
                "Name": faker.person.fullName(),
                "Organization": "",
                "NameEInvoice": faker.person.fullName(),
                "ContactNumber": faker.phone.number(),
                "ContactNumberEInvoice": faker.phone.number(),
                "BirthDate": faker.date.birthdate().toISOString(),
                "Gender": 0,
                "Email": faker.internet.email(),
                "EmailEInvoice": faker.internet.email(),
                "Address": faker.location.streetAddress(),
                "LocationName": "Thành phố Hà Nội",
                "WardName": "Phường Ba Đình",
                "LocationId": 743,
                "WardId": 11541,
                "AdministrativeAreaId": null,
                "CustomerGroupDetails": [],
                "RetailerId": 430092,
                ...overrides
            },
            "isMergedSupplier": false,
            "isCreateNewSupplier": true,
            "MergedSupplierId": 0,
            "SkipValidateEmail": false,
            "UseCustomValidation": true,
        }
    }
}