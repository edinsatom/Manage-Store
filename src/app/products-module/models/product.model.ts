import { FileModel } from "./file.model";

export interface ProductModel {

    uid?: string;
    name: string;
    details: string;
    country: string;
    stock: number;
    price: number;
    
}
