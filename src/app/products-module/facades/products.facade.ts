import { Injectable } from '@angular/core';

import { ProductModel } from '@products-module/models/product.model';
import { FirestoreService } from '@common-module/services/firestore.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { FirebaseService } from '@common-module/services/firebase.service';
import { AppState } from '@root/app/app.reducer';
import { Store } from '@ngrx/store';
import { IUserModel } from '@common-module/models/user.model';
import { AuthState } from '@auth-module/store/auth.reducer';
import { UploadResult } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsFacade {

  private CARPETA_IMG = 'img/';
  private url = "https://store-66667-default-rtdb.firebaseio.com";

  private document: string = 'products'
  private collection: string = 'items';

  constructor(
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
    private firestoreService: FirestoreService<ProductModel>
  ) {

  }

  getCurrentUser(): Observable<IUserModel | null> {
    return this.store.select('auth').pipe(
      map((resp: AuthState) => resp.user as IUserModel)
    )
  }

  getAllProducts(uid: string): Observable<any[]> {

    return this.firestoreService.getItemsOfCollection(
      `${uid}/${this.document}/${this.collection}`
    )
  }

  getProduct(uid: string, itemId: string){
    const collectionPath = `${uid}/${this.document}/${this.collection}`
    return this.firestoreService.getItemOfCollection(collectionPath, itemId).pipe(
      map( resp => {
        if(resp.exists){
          return {
            id: itemId,
            ...resp.data(),
          }
        }
        return null;
      })
    )
  }

  addProduct(uid: string, product: ProductModel): Promise<any> {

    return this.firestoreService.addItemToCollection(
      `${uid}/${this.document}`,
      this.collection,
      product
    )
  }
  

  updateProduct(uid: string, itemId:string, item: ProductModel) {
    return this.firestoreService.updateItem(`${uid}/${this.document}/${this.collection}/${itemId}`, item)
  }

  deleteProduct(userUid: string, uidItem: string) {

    return this.firestoreService.deleteItem(
      `${userUid}/${this.document}/${this.collection}/${uidItem}`
    )
  }

  updateImageProfile(uid: string, userData: ProductModel) {
    return this.firestoreService.updateItem(`${uid}/profile`, userData)
  }

  uploadProfileImage(file: File, pathFile: string): Promise<UploadResult> {
    return this.firebaseService.addFile(file, pathFile)
  }

  getUrlProfileImage(pathFile: string): Promise<string> {
    return this.firebaseService.downloadFile(pathFile);
  }

  deleteProfileImage(pathFile: string) {
    return this.firebaseService.deleteFile(pathFile);
  }


}
