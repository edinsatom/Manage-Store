import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { AppState } from "src/app/app.reducer";
import { UserModel } from "src/app/common-module/models/user.model";
import { AuthService } from "src/app/common-module/services/auth.service";
import { FirestoreService } from "src/app/common-module/services/firestore.service";



@Injectable({
    providedIn: 'root'
})

export class ProfileFacade {constructor(
    private store: Store<AppState>,
    private auhtService: AuthService,
    private firestoreService: FirestoreService<UserModel>
  ){}

  getUser(): Observable<any>{
    return this.store.select('auth').pipe(
      filter( resp => !!resp && !!resp.user ),
      map( resp => resp.user )
    )
  }
}