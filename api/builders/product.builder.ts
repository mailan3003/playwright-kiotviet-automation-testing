import { CreateProductPayload } from '../types/product.types';

export class ProductBuilder {
    private product: Partial <CreateProductPayload> = {};

    constructor() {
        const random = Math.floor(Math.random() * 100000);
        this.product = {
            Name: `Sản phẩm ${random}`,
            Cost: 50000,
            RewardPoint: 0,
        }
    }
    
    withName(name: string): this {
        this.product.Name = name;
        return this;
    }

    withPrice(basePrice: number, cost: number): this {
        this.product.BasePrice = basePrice;
        this.product.Cost = cost;
        return this;
    } 

    withCategory(categoryId: number, categoryName: string): this {
        this.product.CategoryId = categoryId;
        this.product.CategoryName = categoryName;
        return this;
    }

    withoutName(): this {
        this.product.Name = '';
        return this;
    }

    build(): Partial<CreateProductPayload> {
        return { ...this.product} ;
    }
}
