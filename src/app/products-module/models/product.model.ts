import { FileModel } from "./file.model";

export interface ProductModel {
    id?: string;
    nombre: string;
    caracteristicas: string;
    email: string;
    origen: string;
    precio: number;
    lanzamiento: string;
    vendidas: number;
    existencia: number;
    // imagen: FileModel;
}

export class Product implements ProductModel {
    id: string;
    nombre: string;
    caracteristicas: string;
    email: string;
    origen: string;
    precio: number;
    lanzamiento: string;
    vendidas: number;
    existencia: number;

    constructor(
        
    ){
        this.id =  "";
        this.nombre =  "";
        this.caracteristicas =  "";
        this.email =  "";
        this.origen =  "";
        this.precio =  0;
        this.lanzamiento =  "";
        this.vendidas =  0;
        this.existencia =  0;
    }
}
