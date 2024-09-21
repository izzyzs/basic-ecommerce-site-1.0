export interface Product {
    ID: number;
    Brand: string;
    Name: string;
    Description: string;
    Price: number;
    ProductType: string;
    Quantity: number;
    Gender: string;
}

export interface Data {
    status: number;
    products: Array<Product>
}
