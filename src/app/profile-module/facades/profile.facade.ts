import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UploadResult } from "firebase/storage";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { AppState } from "src/app/app.reducer";
import { UserModel } from "src/app/common-module/models/user.model";
import { FirebaseService } from "src/app/common-module/services/firebase.service";
import { FirestoreService } from "src/app/common-module/services/firestore.service";

@Injectable({
    providedIn: 'root'
})

export class ProfileFacade {constructor(
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
    private firestoreService: FirestoreService<UserModel>,
  ){}

  getUser(): Observable<any>{
    return this.store.select('auth').pipe(
      filter( resp => !!resp && !!resp.user ),
      map( resp => resp.user )
    )
  }

  updateImageProfile(uid: string, userData: UserModel){
    return this.firestoreService.updateItem(`${uid}/profile`, userData)
  }

  uploadProfileImage(file: File, pathFile: string): Promise<UploadResult>{
    return this.firebaseService.addFile(file, pathFile)
  }

  getUrlProfileImage(pathFile: string): Promise<string>{
    return this.firebaseService.downloadFile(pathFile);
  }

  deleteProfileImage(pathFile: string){
    return this.firebaseService.deleteFile(pathFile);
  }
}