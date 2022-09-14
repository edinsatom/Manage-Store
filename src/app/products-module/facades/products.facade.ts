import { Injectable } from '@angular/core';

import { ProductModel } from '../models/product.model';
import { FirestoreService } from 'src/app/common-module/services/firestore.service';
import { AuthService } from 'src/app/auth-module/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsFacade {

  private CARPETA_IMG = 'img/';
  private url = "https://store-66667-default-rtdb.firebaseio.com";

  private  uid: string | undefined;
  private document: string = 'products'
  private collection: string = 'items';

  constructor(
    private authService: AuthService,

    private firestoreService: FirestoreService<ProductModel>
  ) { 
    
  }

  getAllProducts():Observable<any[]>{

    this.uid = 'this.authService.user?.uid';

    return this.firestoreService.getItemsOfCollection(
      `${this.uid}/${this.document}/${this.collection}`
    )
  }

  addProduct(product: ProductModel):Promise<any> {

    this.uid = 'this.authService.user?.uid';

    return this.firestoreService.addItemToCollection(
      `${this.uid}/${this.document}`,
      this.collection,
      product
    )
  }

  updateProduct(){

  }

  deleteProduct(uidItem: string){
    this.uid = 'this.authService.user?.uid';

    return this.firestoreService.deleteItem(
      `${this.uid}/${this.document}/${this.collection}/${uidItem}`
    )
  }


}
