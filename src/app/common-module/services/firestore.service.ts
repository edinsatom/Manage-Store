import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/storage';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T> {

  constructor(
    private firestore: AngularFirestore
  ) { }

  subscribeToDoc(path: string){
    return this.firestore.doc(path).valueChanges()
  }

  addItemToDoc(uid_and_collection: string, item: T) {
    return this.firestore.doc(`${uid_and_collection}`)
      .set({ ...item });
  }

  updateItem(uid_and_collection:string, item: T){
    return this.firestore.doc(uid_and_collection).update({...item});
  }

  addItemToCollection(uid_and_doc: string, collection: string, item: T): Promise<any> {
    return this.firestore.doc(uid_and_doc)
      .collection(collection)
      .add({ ...item })
  }

  getItemsOfCollection(uid_and_doc_and_collection: string): Observable<T[]> {
    return this.firestore.collection(
      `${uid_and_doc_and_collection}`
    ).snapshotChanges().pipe(
      map(snapshot => (
        snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        }))
      ))
    )
  }

  getItemOfCollection(pathCollection: string, itemId: string): Observable<any>{
    return this.firestore.collection(pathCollection).doc(itemId).get()
  }

  deleteItem(uidAndDocAndCollectionAndItem: string): Promise<any> {
    return this.firestore.doc(uidAndDocAndCollectionAndItem).delete();
  }



}
