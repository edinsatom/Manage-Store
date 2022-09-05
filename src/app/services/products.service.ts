import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { ProductModel } from '../definitions/models/product.model';
import { UserModel } from '../definitions/models/user.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { FileModel } from '../definitions/models/file.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private CARPETA_IMG = 'img/';
  private url = "https://store-63b87-default-rtdb.firebaseio.com";

  constructor(
    private http: HttpClient, 
    private storage: AngularFireStorage
  ) { }

  getProductos() {

    return this.http.get(`${this.url}/products.json`)
      .pipe(
        map(resp => this._generarArreglo(resp))
      );
  }
  
  uploadFile(imagen: FileModel) {
    const file = imagen.file;
    const filePath = `${this.CARPETA_IMG}${imagen.nameFile}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  }

  obtenerImagen(imagen: string | undefined) {
    const ref = this.storage.ref(`${this.CARPETA_IMG}${imagen}`);
    return ref.getDownloadURL();
  }


  crearProducto(producto: ProductModel) {

    return this.http.post(`${this.url}/products.json`, producto)
      .pipe(
        map((resp: any) => {
          producto.id = resp.name;
          // this.uploadFile(producto.imagen);
          return producto;
        })
      );
  }

  actualizarProducto(producto: ProductModel) {

    const producTemp = {
      ...producto
    };

    let id = producto.id;
    delete producTemp.id;

    return this.http.put(`${this.url}/products/${producto.id}.json`, producTemp)
      .pipe(
        map((resp: any) => {
          producto.id = id;
          return producto;
        })
      );
  }

  getUsuario() {

    let usuario: UserModel;

    return this.http.get(`${this.url}/usuario.json`)
      .pipe(
        map((resp: any) => {
          usuario = resp;
          return usuario;
        })
      );
  }

  getProducto(id: string) {

    return this.http.get(`${this.url}/products/${id}.json`);
  }

  borrarProducto(producto: ProductModel) {

    return this.http.delete(`${this.url}/products/${producto.id}.json`);
  }

  private _generarArreglo(productsObj: any) {

    const productos: ProductModel[] = [];

    if (productsObj === null) return [];

    Object.keys(productsObj).forEach(key => {      
      const producto: ProductModel = productsObj[key];
      producto.id = key;
      // this.obtenerImagen(producto.imagen.nombreArchivo).subscribe(
      //   resp => {
      //     producto.imagen.url = resp;
      //   }
      // )
      productos.push(producto);
    })


    return productos;
  }
}
