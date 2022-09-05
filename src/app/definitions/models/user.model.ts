export interface UserModel {
    name: string;
    password?: string;
    cargo?:string;
    ingreso?:string;
    img?:string;

    // constructor(nombre:string, cargo:string, ingreso:string, img:string){
    //     this.nombre = nombre;
    //     this.cargo = cargo;
    //     this.ingreso = ingreso;
    //     this.img = img;
    // }
}